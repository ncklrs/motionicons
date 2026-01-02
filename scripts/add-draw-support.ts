/**
 * Script to add draw animation support to all icon components
 *
 * This script updates each icon to:
 * 1. Add `isDraw` variable based on motionType
 * 2. Add `draw-animation` class to SVG when isDraw is true
 * 3. Add `draw-path` class and pathLength={1} to all stroke elements
 */

import { readdir, readFile, writeFile } from 'fs/promises';
import { join } from 'path';

const ICONS_DIR = join(import.meta.dir, '../src/icons');

// Elements that can have stroke and should get draw animation
const STROKE_ELEMENTS = ['path', 'circle', 'line', 'polyline', 'rect', 'ellipse'];

async function processIcon(filePath: string): Promise<boolean> {
  const content = await readFile(filePath, 'utf-8');
  const fileName = filePath.split('/').pop();

  // Skip index.ts and any non-component files
  if (fileName === 'index.ts' || !content.includes('motion.svg')) {
    return false;
  }

  // Skip if already has CSS-based draw support (draw-animation class)
  if (content.includes('draw-animation')) {
    console.log(`Skipping ${fileName} - already has CSS draw support`);
    return false;
  }

  let updated = content;

  // 1. Add isDraw variable after useIconAnimation call (if not already present)
  if (!content.includes('isDraw')) {
    const hookPattern = /const \{ ([^}]+) \} = useIconAnimation\(([^)]+)\)/;
    const hookMatch = content.match(hookPattern);

    if (!hookMatch) {
      console.log(`Skipping ${fileName} - no useIconAnimation hook found`);
      return false;
    }

    // Add isDraw after the hook
    updated = updated.replace(
      hookPattern,
      `const { $1 } = useIconAnimation($2)\n  const isDraw = motionType === 'draw'`
    );
  }

  // 2. Update className on motion.svg to include draw-animation when isDraw
  // Handle various className patterns

  // Pattern: className={className}
  updated = updated.replace(
    /(<motion\.svg[^>]*?)className=\{className\}/g,
    '$1className={`${className || \'\'} ${isDraw ? \'draw-animation\' : \'\'}`.trim()}'
  );

  // Pattern: className=""
  updated = updated.replace(
    /(<motion\.svg[^>]*?)className="([^"]*)"/g,
    '$1className={`$2 ${isDraw ? \'draw-animation\' : \'\'}`.trim()}'
  );

  // Pattern: no className - add it before the first >
  if (!updated.includes('className=')) {
    updated = updated.replace(
      /(<motion\.svg[^>]*?)(>|\/>)/,
      '$1 className={isDraw ? \'draw-animation\' : \'\'}$2'
    );
  }

  // 3. Add draw-path class and pathLength to stroke elements
  for (const element of STROKE_ELEMENTS) {
    // Handle motion.element (e.g., motion.path)
    const motionElementRegex = new RegExp(
      `<motion\\.${element}([^>]*?)(\\/?>)`,
      'g'
    );

    updated = updated.replace(motionElementRegex, (match, attrs, closing) => {
      // Skip if already has pathLength
      if (attrs.includes('pathLength')) {
        // Just add className if missing
        if (!attrs.includes('className')) {
          return `<motion.${element}${attrs} className={isDraw ? 'draw-path' : ''}${closing}`;
        }
        return match;
      }

      // Add pathLength and className
      if (!attrs.includes('className')) {
        return `<motion.${element}${attrs} pathLength={1} className={isDraw ? 'draw-path' : ''}${closing}`;
      } else {
        // Has className, just add pathLength
        return `<motion.${element}${attrs.replace(/className="([^"]*)"/, 'className={`$1 ${isDraw ? \'draw-path\' : \'\'}`.trim()}')} pathLength={1}${closing}`;
      }
    });

    // Handle plain element (e.g., <path>)
    const plainElementRegex = new RegExp(
      `<${element}([^>]*?)(\\/?>)`,
      'g'
    );

    updated = updated.replace(plainElementRegex, (match, attrs, closing) => {
      // Skip if it's inside a string or comment
      if (match.includes('motion.')) return match;

      // Skip if already has pathLength
      if (attrs.includes('pathLength')) {
        if (!attrs.includes('className')) {
          return `<${element}${attrs} className={isDraw ? 'draw-path' : ''}${closing}`;
        }
        return match;
      }

      // Add pathLength and className
      if (!attrs.includes('className')) {
        return `<${element}${attrs} pathLength={1} className={isDraw ? 'draw-path' : ''}${closing}`;
      }
      return match;
    });
  }

  // Write if changed
  if (updated !== content) {
    await writeFile(filePath, updated, 'utf-8');
    console.log(`Updated ${fileName}`);
    return true;
  }

  return false;
}

async function main() {
  console.log('Adding draw animation support to all icons...\n');

  const files = await readdir(ICONS_DIR);
  const iconFiles = files.filter(f => f.endsWith('.tsx') && f !== 'index.tsx');

  console.log(`Found ${iconFiles.length} icon files\n`);

  let updatedCount = 0;
  let skippedCount = 0;

  for (const file of iconFiles) {
    const filePath = join(ICONS_DIR, file);
    try {
      const wasUpdated = await processIcon(filePath);
      if (wasUpdated) {
        updatedCount++;
      } else {
        skippedCount++;
      }
    } catch (error) {
      console.error(`Error processing ${file}:`, error);
    }
  }

  console.log(`\nDone! Updated ${updatedCount} files, skipped ${skippedCount} files.`);
}

main();
