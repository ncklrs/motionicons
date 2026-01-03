import * as fs from 'fs'

// Get list of existing icon names (from filenames)
const iconFiles = fs.readdirSync('src/icons')
  .filter(f => f.endsWith('.tsx') && f !== 'index.ts')
  .map(f => f.replace('.tsx', '').replace(/-([a-z])/g, (_, c) => c.toUpperCase()).replace(/^([a-z])/, (_, c) => c.toUpperCase()))

// Read and parse the icons-to-generate file
const content = fs.readFileSync('scripts/icon-generator/icons-to-generate.ts', 'utf8')

// Extract icon names from each batch
const batches = ['ARROWS', 'UI', 'DEVELOPER', 'AI', 'MEDIA', 'SECURITY', 'FINANCE', 'COMMUNICATION', 'ACCESSIBILITY']
const results: Record<string, string[]> = {}

batches.forEach(batch => {
  const regex = new RegExp(`export const ${batch}:[^=]*=\\s*\\[([\\s\\S]*?)\\];`, 'm')
  const match = content.match(regex)
  if (match) {
    const names = match[1].match(/name:\s*["']([^"']+)["']/g)?.map(m => m.match(/["']([^"']+)["']/)![1]) || []
    const missing = names.filter(n => !iconFiles.includes(n))
    if (missing.length > 0) {
      results[batch] = missing
    }
  }
})

console.log('MISSING ICONS BY BATCH:')
Object.entries(results).forEach(([batch, icons]) => {
  console.log(`\n${batch} (${icons.length} missing):`)
  console.log(icons.join(', '))
})

console.log('\n\nTOTAL MISSING:', Object.values(results).flat().length)
