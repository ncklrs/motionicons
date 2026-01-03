/**
 * Build-time script to extract SVG data from MotionIcon source files
 *
 * Parses all 350 icon .tsx files and generates a JSON file with:
 * - SVG elements and their attributes
 * - Category mappings
 * - Tags from registry
 * - Default motion types
 *
 * Output: src/data/icons.json
 *
 * Usage: npx tsx scripts/extract-svg-data.ts
 */

import * as fs from 'fs'
import * as path from 'path'

// Paths (relative to this script's location in packages/vscode-extension/scripts/)
const SCRIPT_DIR = path.dirname(new URL(import.meta.url).pathname)
const PROJECT_ROOT = path.resolve(SCRIPT_DIR, '../../../')
const ICONS_DIR = path.resolve(PROJECT_ROOT, 'src/icons')
const CATEGORIES_FILE = path.resolve(PROJECT_ROOT, 'src/lib/icon-categories.ts')
const REGISTRY_FILE = path.resolve(PROJECT_ROOT, 'registry.json')
const OUTPUT_FILE = path.resolve(SCRIPT_DIR, '../src/data/icons.json')

// Types
interface SVGElement {
  type: 'path' | 'polyline' | 'line' | 'rect' | 'circle' | 'polygon'
  attributes: Record<string, string | number>
}

interface IconData {
  id: string
  name: string
  elements: SVGElement[]
  viewBox: string
  categories: string[]
  tags: string[]
  defaultMotionType: string
}

// Convert kebab-case filename to PascalCase
function kebabToPascal(kebab: string): string {
  return kebab
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('')
}

// Parse icon categories from TypeScript file
function parseIconCategories(): Record<string, string[]> {
  const content = fs.readFileSync(CATEGORIES_FILE, 'utf-8')
  const categories: Record<string, string[]> = {}

  // Find the iconCategories object
  const objectMatch = content.match(/export const iconCategories[^{]*\{([\s\S]*?)\n\}/)
  if (!objectMatch) {
    console.warn('Could not find iconCategories object')
    return categories
  }

  const objectContent = objectMatch[1]
  const entryRegex = /(\w+):\s*\[([^\]]*)\]/g
  let match

  while ((match = entryRegex.exec(objectContent)) !== null) {
    const iconName = match[1]
    const categoriesStr = match[2]
    const categoryMatches = categoriesStr.match(/'([^']+)'/g)
    if (categoryMatches) {
      categories[iconName] = categoryMatches.map(c => c.replace(/'/g, ''))
    }
  }

  return categories
}

// Parse registry.json for tags
function parseRegistry(): Record<string, string[]> {
  const tags: Record<string, string[]> = {}

  try {
    const content = fs.readFileSync(REGISTRY_FILE, 'utf-8')
    const registry = JSON.parse(content)

    if (registry.icons) {
      for (const [iconId, iconData] of Object.entries(registry.icons)) {
        const data = iconData as { tags?: string[] }
        if (data.tags) {
          tags[iconId] = data.tags
        }
      }
    }
  } catch (error) {
    console.warn('Could not parse registry.json:', error)
  }

  return tags
}

// Extract SVG element attributes from JSX string
function extractElementAttributes(elementStr: string, elementType: string): Record<string, string | number> {
  const attributes: Record<string, string | number> = {}

  const attributePatterns: Record<string, string[]> = {
    path: ['d'],
    polyline: ['points'],
    polygon: ['points'],
    line: ['x1', 'y1', 'x2', 'y2'],
    rect: ['x', 'y', 'width', 'height', 'rx', 'ry'],
    circle: ['cx', 'cy', 'r'],
  }

  const attrsToExtract = attributePatterns[elementType] || []

  // Attributes that should always be kept as strings (contain spaces or complex values)
  const stringOnlyAttrs = ['d', 'points']

  for (const attr of attrsToExtract) {
    const patterns = [
      new RegExp(attr + '="([^"]*)"', 'i'),
      new RegExp(attr + '=\\{([^}]*)\\}', 'i'),
      new RegExp(attr + "='([^']*)'", 'i'),
    ]

    for (const pattern of patterns) {
      const match = elementStr.match(pattern)
      if (match) {
        const value = match[1].trim()
        // Keep d and points as strings; convert numeric attrs to numbers
        if (stringOnlyAttrs.includes(attr)) {
          attributes[attr] = value
        } else {
          const numValue = parseFloat(value)
          attributes[attr] = isNaN(numValue) ? value : numValue
        }
        break
      }
    }
  }

  return attributes
}

// Parse a single icon file
function parseIconFile(filePath: string): IconData | null {
  const content = fs.readFileSync(filePath, 'utf-8')
  const filename = path.basename(filePath, '.tsx')
  const iconName = kebabToPascal(filename)

  const livelyMatch = content.match(/lively\s*=\s*['"](\w+)['"]/)
  const defaultMotionType = livelyMatch ? livelyMatch[1] : 'scale'

  const viewBoxMatch = content.match(/viewBox=["']([^"']+)["']/)
  const viewBox = viewBoxMatch ? viewBoxMatch[1] : '0 0 24 24'

  const elements: SVGElement[] = []
  const elementTypes = ['path', 'polyline', 'line', 'rect', 'circle', 'polygon'] as const

  for (const elementType of elementTypes) {
    const selfClosingRegex = new RegExp('<motion\\.' + elementType + '\\s+([^>]*?)\\s*/>', 'g')
    const openTagRegex = new RegExp('<motion\\.' + elementType + '\\s+([^>]*?)>', 'g')

    let match

    while ((match = selfClosingRegex.exec(content)) !== null) {
      const attrs = extractElementAttributes(match[1], elementType)
      if (Object.keys(attrs).length > 0) {
        elements.push({ type: elementType, attributes: attrs })
      }
    }

    while ((match = openTagRegex.exec(content)) !== null) {
      const attrs = extractElementAttributes(match[1], elementType)
      if (Object.keys(attrs).length > 0) {
        const isDuplicate = elements.some(
          el => el.type === elementType && JSON.stringify(el.attributes) === JSON.stringify(attrs)
        )
        if (!isDuplicate) {
          elements.push({ type: elementType, attributes: attrs })
        }
      }
    }
  }

  if (elements.length === 0) {
    console.warn('No SVG elements found in ' + filename)
  }

  return {
    id: filename,
    name: iconName,
    elements,
    viewBox,
    categories: [],
    tags: [],
    defaultMotionType,
  }
}

// Main extraction function
function extractSvgData(): void {
  console.log('Starting SVG data extraction...')
  console.log('Icons directory: ' + ICONS_DIR)
  console.log('Categories file: ' + CATEGORIES_FILE)
  console.log('Registry file: ' + REGISTRY_FILE)
  console.log('Output file: ' + OUTPUT_FILE)

  const iconCategories = parseIconCategories()
  const registryTags = parseRegistry()

  console.log('Loaded ' + Object.keys(iconCategories).length + ' category mappings')
  console.log('Loaded ' + Object.keys(registryTags).length + ' tag mappings')

  const iconFiles = fs.readdirSync(ICONS_DIR)
    .filter(f => f.endsWith('.tsx'))
    .sort()

  console.log('Found ' + iconFiles.length + ' icon files')

  const icons: IconData[] = []

  for (const file of iconFiles) {
    const filePath = path.join(ICONS_DIR, file)
    const iconData = parseIconFile(filePath)

    if (iconData) {
      iconData.categories = iconCategories[iconData.name] || []
      iconData.tags = registryTags[iconData.id] || []
      icons.push(iconData)
    }
  }

  console.log('Successfully parsed ' + icons.length + ' icons')

  const outputDir = path.dirname(OUTPUT_FILE)
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(icons, null, 2))
  console.log('Output written to ' + OUTPUT_FILE)

  const iconsWithCategories = icons.filter(i => i.categories.length > 0).length
  const iconsWithTags = icons.filter(i => i.tags.length > 0).length
  const totalElements = icons.reduce((sum, i) => sum + i.elements.length, 0)

  console.log('\n--- Summary ---')
  console.log('Total icons: ' + icons.length)
  console.log('Icons with categories: ' + iconsWithCategories)
  console.log('Icons with tags: ' + iconsWithTags)
  console.log('Total SVG elements: ' + totalElements)
  console.log('Average elements per icon: ' + (totalElements / icons.length).toFixed(2))

  const livelys: Record<string, number> = {}
  for (const icon of icons) {
    livelys[icon.defaultMotionType] = (livelys[icon.defaultMotionType] || 0) + 1
  }
  console.log('\nDefault motion types:')
  for (const [type, count] of Object.entries(livelys).sort((a, b) => b[1] - a[1])) {
    console.log('  ' + type + ': ' + count)
  }
}

extractSvgData()
