#!/usr/bin/env npx tsx
/**
 * Build Registry Script
 *
 * Generates shadcn-compatible registry JSON files from transformed icons.
 *
 * Output:
 * - public/r/{icon-name}.json - Individual icon items
 * - public/r/lively-provider.json - Provider component
 * - public/r/use-lively-animation.json - Animation hook
 * - public/r/lively-types.json - TypeScript types
 * - public/r/lively-animations.json - CSS animations
 * - public/r/lively-essentials.json - Essential icons bundle
 * - registry/registry.json - Main manifest
 *
 * Usage:
 *   npx tsx scripts/build-registry.ts
 */

import * as fs from "fs";
import * as path from "path";

const REGISTRY_ICONS_DIR = path.join(process.cwd(), "registry/icons");
const REGISTRY_LIB_DIR = path.join(process.cwd(), "registry/lib");
const REGISTRY_STYLES_DIR = path.join(process.cwd(), "registry/styles");
const PUBLIC_R_DIR = path.join(process.cwd(), "public/r");
const REGISTRY_OUTPUT = path.join(process.cwd(), "registry/registry.json");

/**
 * shadcn Registry Item Schema
 */
interface RegistryItem {
  $schema?: string;
  name: string;
  type:
    | "registry:ui"
    | "registry:lib"
    | "registry:hook"
    | "registry:style"
    | "registry:block";
  title?: string;
  description?: string;
  dependencies?: string[];
  devDependencies?: string[];
  registryDependencies?: string[];
  files: RegistryFile[];
  tailwind?: {
    config?: Record<string, unknown>;
  };
  cssVars?: {
    light?: Record<string, string>;
    dark?: Record<string, string>;
  };
  meta?: Record<string, unknown>;
}

interface RegistryFile {
  path: string;
  content: string;
  type: "registry:ui" | "registry:lib" | "registry:hook" | "registry:style";
  target?: string;
}

interface RegistryManifest {
  $schema: string;
  name: string;
  homepage: string;
  items: Array<{
    name: string;
    type: string;
    description?: string;
    dependencies?: string[];
    registryDependencies?: string[];
  }>;
}

/**
 * Convert kebab-case to PascalCase
 */
function toPascalCase(str: string): string {
  return str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
}

/**
 * Read file content safely
 */
function readFileContent(filePath: string): string {
  try {
    return fs.readFileSync(filePath, "utf-8");
  } catch {
    console.error(`Failed to read: ${filePath}`);
    return "";
  }
}

/**
 * Build registry item for an icon
 */
function buildIconRegistryItem(iconName: string): RegistryItem | null {
  const iconPath = path.join(REGISTRY_ICONS_DIR, `${iconName}.tsx`);
  if (!fs.existsSync(iconPath)) {
    return null;
  }

  const content = readFileContent(iconPath);
  const componentName = toPascalCase(iconName);

  return {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: iconName,
    type: "registry:ui",
    title: componentName,
    description: `Animated ${componentName} icon from LivelyIcons`,
    dependencies: ["motion"],
    registryDependencies: [
      "lively-provider",
      "use-lively-animation",
      "lively-types",
    ],
    files: [
      {
        path: `icons/${iconName}.tsx`,
        content,
        type: "registry:ui",
        target: `components/icons/${iconName}.tsx`,
      },
    ],
  };
}

/**
 * Build registry item for the provider
 */
function buildProviderRegistryItem(): RegistryItem {
  const content = readFileContent(
    path.join(REGISTRY_LIB_DIR, "lively-provider.tsx")
  );

  return {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: "lively-provider",
    type: "registry:lib",
    title: "LivelyProvider",
    description:
      "Context provider for LivelyIcons configuration. Wrap your app to set global icon defaults.",
    dependencies: [],
    registryDependencies: ["lively-types"],
    files: [
      {
        path: "lib/lively-provider.tsx",
        content,
        type: "registry:lib",
        target: "lib/lively-provider.tsx",
      },
    ],
  };
}

/**
 * Build registry item for the animation hook
 */
function buildHookRegistryItem(): RegistryItem {
  const content = readFileContent(
    path.join(REGISTRY_LIB_DIR, "use-lively-animation.ts")
  );

  return {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: "use-lively-animation",
    type: "registry:hook",
    title: "useLivelyAnimation",
    description:
      "React hook for managing LivelyIcons animation state and variants.",
    dependencies: ["motion"],
    registryDependencies: ["lively-provider", "lively-types"],
    files: [
      {
        path: "hooks/use-lively-animation.ts",
        content,
        type: "registry:hook",
        target: "hooks/use-lively-animation.ts",
      },
    ],
  };
}

/**
 * Build registry item for types
 */
function buildTypesRegistryItem(): RegistryItem {
  const content = readFileContent(path.join(REGISTRY_LIB_DIR, "types.ts"));

  return {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: "lively-types",
    type: "registry:lib",
    title: "LivelyIcons Types",
    description: "TypeScript type definitions for LivelyIcons components.",
    dependencies: [],
    registryDependencies: [],
    files: [
      {
        path: "lib/lively-types.ts",
        content,
        type: "registry:lib",
        target: "lib/lively-types.ts",
      },
    ],
  };
}

/**
 * Build registry item for CSS animations
 */
function buildCssRegistryItem(): RegistryItem {
  const content = readFileContent(
    path.join(REGISTRY_STYLES_DIR, "lively-animations.css")
  );

  return {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: "lively-animations",
    type: "registry:style",
    title: "LivelyIcons CSS Animations",
    description:
      "CSS keyframe animations for LivelyIcons. Alternative to Motion-based animations.",
    dependencies: [],
    registryDependencies: [],
    files: [
      {
        path: "styles/lively-animations.css",
        content,
        type: "registry:style",
        target: "styles/lively-animations.css",
      },
    ],
    cssVars: {
      light: {
        "--lively-icon-size": "24px",
        "--lively-stroke-width": "2",
        "--lively-animation-duration": "0.3s",
      },
      dark: {
        "--lively-icon-size": "24px",
        "--lively-stroke-width": "2",
        "--lively-animation-duration": "0.3s",
      },
    },
  };
}

/**
 * Build essentials bundle (provider, hook, types, popular icons)
 */
function buildEssentialsBundle(iconNames: string[]): RegistryItem {
  const essentialIcons = iconNames.slice(0, 20); // First 20 icons

  return {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: "lively-essentials",
    type: "registry:ui",
    title: "LivelyIcons Essentials",
    description:
      "Essential LivelyIcons bundle including provider, hook, and popular icons.",
    dependencies: ["motion"],
    registryDependencies: [
      "lively-provider",
      "use-lively-animation",
      "lively-types",
      ...essentialIcons,
    ],
    files: [],
  };
}

/**
 * Write registry item to public/r directory
 */
function writeRegistryItem(item: RegistryItem): void {
  const outputPath = path.join(PUBLIC_R_DIR, `${item.name}.json`);
  fs.writeFileSync(outputPath, JSON.stringify(item, null, 2));
  console.log(`  [OK] ${item.name}.json`);
}

/**
 * Main build function
 */
async function main() {
  console.log("Building shadcn registry...\n");

  // Ensure output directory exists
  if (!fs.existsSync(PUBLIC_R_DIR)) {
    fs.mkdirSync(PUBLIC_R_DIR, { recursive: true });
  }

  // Get list of transformed icons
  const iconFiles = fs.existsSync(REGISTRY_ICONS_DIR)
    ? fs
        .readdirSync(REGISTRY_ICONS_DIR)
        .filter((f) => f.endsWith(".tsx") && f !== "index.ts")
        .map((f) => f.replace(".tsx", ""))
    : [];

  console.log(`Found ${iconFiles.length} transformed icons\n`);

  // Build library items
  console.log("Building library items...");
  writeRegistryItem(buildTypesRegistryItem());
  writeRegistryItem(buildProviderRegistryItem());
  writeRegistryItem(buildHookRegistryItem());
  writeRegistryItem(buildCssRegistryItem());

  // Build icon items
  console.log("\nBuilding icon items...");
  const builtIcons: string[] = [];
  for (const iconName of iconFiles) {
    const item = buildIconRegistryItem(iconName);
    if (item) {
      writeRegistryItem(item);
      builtIcons.push(iconName);
    }
  }

  // Build bundles
  if (builtIcons.length > 0) {
    console.log("\nBuilding bundles...");
    writeRegistryItem(buildEssentialsBundle(builtIcons));
  }

  // Build main manifest
  console.log("\nBuilding registry manifest...");
  const manifest: RegistryManifest = {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: "livelyicons",
    homepage: "https://livelyicons.com",
    items: [
      {
        name: "lively-types",
        type: "registry:lib",
        description: "TypeScript types for LivelyIcons",
      },
      {
        name: "lively-provider",
        type: "registry:lib",
        description: "Context provider for global icon configuration",
        registryDependencies: ["lively-types"],
      },
      {
        name: "use-lively-animation",
        type: "registry:hook",
        description: "Animation hook for LivelyIcons",
        dependencies: ["motion"],
        registryDependencies: ["lively-provider", "lively-types"],
      },
      {
        name: "lively-animations",
        type: "registry:style",
        description: "CSS animations for LivelyIcons",
      },
      {
        name: "lively-essentials",
        type: "registry:ui",
        description: "Essential icons bundle",
        dependencies: ["motion"],
        registryDependencies: [
          "lively-provider",
          "use-lively-animation",
          "lively-types",
        ],
      },
      ...builtIcons.map((name) => ({
        name,
        type: "registry:ui" as const,
        description: `${toPascalCase(name)} animated icon`,
        dependencies: ["motion"],
        registryDependencies: [
          "lively-provider",
          "use-lively-animation",
          "lively-types",
        ],
      })),
    ],
  };

  fs.writeFileSync(REGISTRY_OUTPUT, JSON.stringify(manifest, null, 2));
  console.log("  [OK] registry/registry.json");

  // Summary
  console.log("\n--- Summary ---");
  console.log(`Library items: 4`);
  console.log(`Icon items: ${builtIcons.length}`);
  console.log(`Bundles: 1`);
  console.log(`\nRegistry files written to: public/r/`);
  console.log(`Manifest written to: registry/registry.json`);

  // Usage instructions
  console.log("\n--- Usage ---");
  console.log("Install an icon:");
  console.log(
    "  npx shadcn@latest add https://livelyicons.com/r/heart-pulse.json"
  );
  console.log("\nInstall essentials bundle:");
  console.log(
    "  npx shadcn@latest add https://livelyicons.com/r/lively-essentials.json"
  );
}

main().catch(console.error);
