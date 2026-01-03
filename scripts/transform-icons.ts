#!/usr/bin/env npx tsx
/**
 * Transform Icons Script
 *
 * Transforms icons from the current LivelyIcons pattern to shadcn-compatible pattern.
 *
 * Features:
 * - Adds React.forwardRef
 * - Uses CSS variables: var(--lively-icon-size, 24)
 * - Imports from @/lib/utils for cn()
 * - Updates export pattern
 *
 * Usage:
 *   npx tsx scripts/transform-icons.ts [icon-names...]
 *   npx tsx scripts/transform-icons.ts heart-pulse activity globe
 *   npx tsx scripts/transform-icons.ts --all (transforms all icons)
 */

import * as fs from "fs";
import * as path from "path";

const SOURCE_DIR = path.join(process.cwd(), "src/icons");
const OUTPUT_DIR = path.join(process.cwd(), "registry/icons");

interface IconInfo {
  name: string;
  componentName: string;
  defaultLively: string;
  paths: string[];
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
 * Parse an icon source file to extract metadata
 */
function parseIconSource(content: string, fileName: string): IconInfo {
  const name = fileName.replace(".tsx", "");
  const componentName = toPascalCase(name);

  // Extract default lively value
  const livelyMatch = content.match(/lively\s*=\s*['"](\w+)['"]/);
  const defaultLively = livelyMatch ? livelyMatch[1] : "scale";

  // Extract SVG path elements (simplified - extracts d attributes and element types)
  const pathMatches = content.matchAll(
    /<motion\.(path|circle|line|rect|ellipse|polygon|polyline)[^>]*>/g
  );
  const paths = Array.from(pathMatches).map((m) => m[0]);

  return {
    name,
    componentName,
    defaultLively,
    paths,
  };
}

/**
 * Extract SVG children from the original component
 */
function extractSvgChildren(content: string): string {
  // Match everything between <motion.svg ...> and </motion.svg>
  const svgMatch = content.match(
    /<motion\.svg[^>]*>([\s\S]*?)<\/motion\.svg>/
  );
  if (!svgMatch) return "";

  let children = svgMatch[1].trim();

  // Transform motion.* elements to regular SVG elements for the shadcn version
  // We'll keep motion.* for the animated version
  children = children
    .replace(/<motion\.path/g, "<motion.path")
    .replace(/<motion\.circle/g, "<motion.circle")
    .replace(/<motion\.line/g, "<motion.line")
    .replace(/<motion\.rect/g, "<motion.rect")
    .replace(/<motion\.ellipse/g, "<motion.ellipse")
    .replace(/<motion\.polygon/g, "<motion.polygon")
    .replace(/<motion\.polyline/g, "<motion.polyline")
    .replace(/<motion\.g/g, "<motion.g");

  return children;
}

/**
 * Transform an icon to shadcn-compatible format
 */
function transformIcon(sourcePath: string): string {
  const content = fs.readFileSync(sourcePath, "utf-8");
  const fileName = path.basename(sourcePath);
  const info = parseIconSource(content, fileName);

  const svgChildren = extractSvgChildren(content);

  // Generate the transformed component
  const transformed = `"use client";

import * as React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useLivelyAnimation } from "@/hooks/use-lively-animation";
import type { LivelyIconProps } from "@/lib/lively-types";

const ${info.componentName} = React.forwardRef<SVGSVGElement, LivelyIconProps>(
  (
    {
      size,
      strokeWidth,
      className,
      animated,
      lively = "${info.defaultLively}",
      trigger = "hover",
      "aria-label": ariaLabel,
      ...props
    },
    ref
  ) => {
    const { animationProps, pathAnimationProps, drawWrapperProps } =
      useLivelyAnimation(animated, lively, trigger);
    const isDraw = lively === "draw";

    const iconSize = size ?? "var(--lively-icon-size, 24)";
    const iconStrokeWidth = strokeWidth ?? "var(--lively-stroke-width, 2)";

    return (
      <motion.svg
        ref={ref}
        width={iconSize}
        height={iconSize}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={iconStrokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn("lively-icon", isDraw && "draw-animation", className)}
        {...(!isDraw ? animationProps : drawWrapperProps)}
        role={ariaLabel ? "img" : undefined}
        aria-label={ariaLabel}
        aria-hidden={ariaLabel ? undefined : true}
        {...props}
      >
        ${svgChildren}
      </motion.svg>
    );
  }
);

${info.componentName}.displayName = "${info.componentName}";

export { ${info.componentName} };
`;

  return transformed;
}

/**
 * Get list of all icon files
 */
function getAllIconFiles(): string[] {
  const files = fs.readdirSync(SOURCE_DIR);
  return files
    .filter((f) => f.endsWith(".tsx") && f !== "index.ts" && f !== "index.tsx")
    .map((f) => f.replace(".tsx", ""));
}

/**
 * Main transformation function
 */
async function main() {
  const args = process.argv.slice(2);

  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  let iconsToTransform: string[];

  if (args.includes("--all")) {
    iconsToTransform = getAllIconFiles();
    console.log(`Transforming all ${iconsToTransform.length} icons...`);
  } else if (args.length > 0) {
    iconsToTransform = args.filter((a) => !a.startsWith("--"));
    console.log(`Transforming ${iconsToTransform.length} icons...`);
  } else {
    // Default to a few test icons
    iconsToTransform = [
      "heart-pulse",
      "activity",
      "globe",
      "compass",
      "sun",
      "flame",
      "droplet",
      "wind",
    ];
    console.log(`Transforming ${iconsToTransform.length} test icons...`);
  }

  const results: { success: string[]; failed: string[] } = {
    success: [],
    failed: [],
  };

  for (const iconName of iconsToTransform) {
    const sourcePath = path.join(SOURCE_DIR, `${iconName}.tsx`);
    const outputPath = path.join(OUTPUT_DIR, `${iconName}.tsx`);

    try {
      if (!fs.existsSync(sourcePath)) {
        console.error(`  [SKIP] ${iconName}: Source file not found`);
        results.failed.push(iconName);
        continue;
      }

      const transformed = transformIcon(sourcePath);
      fs.writeFileSync(outputPath, transformed, "utf-8");
      console.log(`  [OK] ${iconName}`);
      results.success.push(iconName);
    } catch (error) {
      console.error(
        `  [FAIL] ${iconName}: ${error instanceof Error ? error.message : error}`
      );
      results.failed.push(iconName);
    }
  }

  console.log("\n--- Summary ---");
  console.log(`Success: ${results.success.length}`);
  console.log(`Failed: ${results.failed.length}`);

  if (results.failed.length > 0) {
    console.log("\nFailed icons:");
    results.failed.forEach((name) => console.log(`  - ${name}`));
  }

  // Generate index file for transformed icons
  if (results.success.length > 0) {
    const indexContent = results.success
      .map((name) => {
        const componentName = toPascalCase(name);
        return `export { ${componentName} } from "./${name}";`;
      })
      .join("\n");

    fs.writeFileSync(path.join(OUTPUT_DIR, "index.ts"), indexContent + "\n");
    console.log("\nGenerated registry/icons/index.ts");
  }
}

main().catch(console.error);
