/**
 * Bundle Size Benchmark Script
 *
 * Tests tree-shaking effectiveness by measuring bundle sizes for different import scenarios.
 * Outputs results to src/lib/bundle-stats.json for use in the demo page.
 *
 * Usage: npx tsx scripts/benchmark-bundle-size.ts
 */

import { build } from 'esbuild'
import { gzipSync } from 'zlib'
import * as fs from 'fs'
import * as path from 'path'

// Get package info
const packageJson = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf-8')
)

// Read icon index to get all icon names
const iconIndexPath = path.join(process.cwd(), 'src/icons/index.ts')
const iconIndexContent = fs.readFileSync(iconIndexPath, 'utf-8')
const iconExportMatches = iconIndexContent.matchAll(/export \{ (\w+) \}/g)
const allIconNames = Array.from(iconExportMatches).map(m => m[1])

// Define test scenarios
interface Scenario {
  name: string
  imports: string[]
  entryType: 'animated' | 'static' | 'full'
}

// Select icons spread across the alphabet for varied testing
const sampleIcons = [
  'Heart', 'Star', 'Bell', 'Check', 'X',
  'ArrowRight', 'Home', 'Settings', 'User', 'Search',
  'Mail', 'Phone', 'Camera', 'Lock', 'Eye',
  'Download', 'Upload', 'Edit', 'Trash', 'Plus',
  'Minus', 'Menu', 'Clock', 'Calendar', 'Map',
  'Bookmark', 'Share', 'Copy', 'Filter', 'Grid',
  'List', 'Image', 'Video', 'Music', 'Mic',
  'Volume', 'Sun', 'Moon', 'Cloud', 'Zap',
  'Activity', 'AlertCircle', 'Archive', 'Award', 'Battery',
  'Book', 'Box', 'Briefcase', 'Calculator', 'Coffee'
]

// Filter to only icons that exist
const availableIcons = sampleIcons.filter(icon => allIconNames.includes(icon))

const scenarios: Scenario[] = [
  { name: '1 icon', imports: availableIcons.slice(0, 1), entryType: 'animated' },
  { name: '5 icons', imports: availableIcons.slice(0, 5), entryType: 'animated' },
  { name: '10 icons', imports: availableIcons.slice(0, 10), entryType: 'animated' },
  { name: '25 icons', imports: availableIcons.slice(0, 25), entryType: 'animated' },
  { name: '50 icons', imports: availableIcons.slice(0, 50), entryType: 'animated' },
  { name: '100 icons', imports: allIconNames.slice(0, 100), entryType: 'animated' },
  { name: 'Full import (*)', imports: ['*'], entryType: 'full' },
]

// Also test static imports
const staticScenarios: Scenario[] = [
  { name: '1 static icon', imports: ['StaticHeart'], entryType: 'static' },
  { name: '5 static icons', imports: ['StaticHeart', 'StaticStar', 'StaticBell', 'StaticCheck', 'StaticX'], entryType: 'static' },
]

interface BundleResult {
  name: string
  imports: string[]
  bundleSize: {
    raw: number
    gzip: number
  }
  percentOfFull?: number
}

interface BundleStats {
  timestamp: string
  packageVersion: string
  packageName: string
  totalIconCount: number
  scenarios: BundleResult[]
  staticScenarios: BundleResult[]
  metadata: {
    bundler: string
    target: string
    format: string
    minified: boolean
    external: string[]
  }
}

async function measureBundle(scenario: Scenario): Promise<BundleResult> {
  // Create temporary entry file
  const tempDir = path.join(process.cwd(), '.benchmark-temp')
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true })
  }

  const entryFile = path.join(tempDir, `entry-${Date.now()}.ts`)

  let entryContent: string
  if (scenario.entryType === 'full') {
    entryContent = `import * as Icons from '../dist/index.mjs';\nexport { Icons };`
  } else if (scenario.entryType === 'static') {
    entryContent = `import { ${scenario.imports.join(', ')} } from '../dist/static.mjs';\nexport { ${scenario.imports.join(', ')} };`
  } else {
    entryContent = `import { ${scenario.imports.join(', ')} } from '../dist/index.mjs';\nexport { ${scenario.imports.join(', ')} };`
  }

  fs.writeFileSync(entryFile, entryContent)

  try {
    const result = await build({
      entryPoints: [entryFile],
      bundle: true,
      minify: true,
      format: 'esm',
      target: 'es2020',
      write: false,
      external: ['react', 'react-dom', 'motion'],
      treeShaking: true,
      metafile: true,
    })

    const outputCode = result.outputFiles[0].text
    const rawSize = Buffer.byteLength(outputCode, 'utf-8')
    const gzipSize = gzipSync(outputCode).length

    return {
      name: scenario.name,
      imports: scenario.imports,
      bundleSize: {
        raw: rawSize,
        gzip: gzipSize,
      },
    }
  } finally {
    // Cleanup temp file
    if (fs.existsSync(entryFile)) {
      fs.unlinkSync(entryFile)
    }
  }
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

async function main() {
  console.log('Bundle Size Benchmark for LivelyIcons')
  console.log('=====================================\n')
  console.log(`Package: ${packageJson.name}@${packageJson.version}`)
  console.log(`Total icons: ${allIconNames.length}\n`)

  // Ensure dist exists
  if (!fs.existsSync(path.join(process.cwd(), 'dist/index.mjs'))) {
    console.error('Error: dist/index.mjs not found. Run `pnpm run build:lib` first.')
    process.exit(1)
  }

  console.log('Running benchmark scenarios...\n')

  // Run animated icon scenarios
  const results: BundleResult[] = []
  for (const scenario of scenarios) {
    process.stdout.write(`  Testing: ${scenario.name}...`)
    const result = await measureBundle(scenario)
    results.push(result)
    console.log(` ${formatBytes(result.bundleSize.gzip)} (gzip)`)
  }

  // Calculate percentages
  const fullSize = results[results.length - 1].bundleSize.gzip
  for (const result of results) {
    result.percentOfFull = Number(((result.bundleSize.gzip / fullSize) * 100).toFixed(2))
  }

  console.log('\nRunning static icon scenarios...\n')

  // Run static icon scenarios
  const staticResults: BundleResult[] = []
  for (const scenario of staticScenarios) {
    process.stdout.write(`  Testing: ${scenario.name}...`)
    try {
      const result = await measureBundle(scenario)
      staticResults.push(result)
      console.log(` ${formatBytes(result.bundleSize.gzip)} (gzip)`)
    } catch (err) {
      console.log(' (skipped - static exports not available)')
    }
  }

  // Print summary table
  console.log('\n=====================================')
  console.log('RESULTS SUMMARY')
  console.log('=====================================\n')
  console.log('Animated Icons:')
  console.log('---------------')
  console.log('| Import         | Raw       | Gzip      | % of Full |')
  console.log('|----------------|-----------|-----------|-----------|')
  for (const result of results) {
    const name = result.name.padEnd(14)
    const raw = formatBytes(result.bundleSize.raw).padEnd(9)
    const gzip = formatBytes(result.bundleSize.gzip).padEnd(9)
    const percent = `${result.percentOfFull}%`.padEnd(9)
    console.log(`| ${name} | ${raw} | ${gzip} | ${percent} |`)
  }

  if (staticResults.length > 0) {
    console.log('\nStatic Icons:')
    console.log('-------------')
    console.log('| Import         | Raw       | Gzip      |')
    console.log('|----------------|-----------|-----------|')
    for (const result of staticResults) {
      const name = result.name.padEnd(14)
      const raw = formatBytes(result.bundleSize.raw).padEnd(9)
      const gzip = formatBytes(result.bundleSize.gzip).padEnd(9)
      console.log(`| ${name} | ${raw} | ${gzip} |`)
    }
  }

  // Tree shaking effectiveness
  const oneIconSize = results[0].bundleSize.gzip
  const fullImportSize = results[results.length - 1].bundleSize.gzip
  const savings = ((1 - oneIconSize / fullImportSize) * 100).toFixed(1)

  console.log('\n=====================================')
  console.log('TREE SHAKING PROOF')
  console.log('=====================================')
  console.log(`\n1 icon: ${formatBytes(oneIconSize)}`)
  console.log(`Full import: ${formatBytes(fullImportSize)}`)
  console.log(`\nTree shaking saves ${savings}% when importing 1 icon!`)

  // Create output stats
  const stats: BundleStats = {
    timestamp: new Date().toISOString(),
    packageVersion: packageJson.version,
    packageName: packageJson.name,
    totalIconCount: allIconNames.length,
    scenarios: results,
    staticScenarios: staticResults,
    metadata: {
      bundler: 'esbuild',
      target: 'es2020',
      format: 'esm',
      minified: true,
      external: ['react', 'react-dom', 'motion'],
    },
  }

  // Write to JSON file
  const outputPath = path.join(process.cwd(), 'src/lib/bundle-stats.json')
  fs.writeFileSync(outputPath, JSON.stringify(stats, null, 2))
  console.log(`\nResults saved to: ${outputPath}`)

  // Cleanup temp directory
  const tempDir = path.join(process.cwd(), '.benchmark-temp')
  if (fs.existsSync(tempDir)) {
    fs.rmdirSync(tempDir, { recursive: true })
  }
}

main().catch(console.error)
