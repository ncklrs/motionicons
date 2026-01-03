/**
 * MotionIcon Style Guide
 *
 * This defines the design system for all MotionIcon icons.
 * Agents use this to ensure consistency when generating new icons.
 */

export const STYLE_GUIDE = {
  // SVG attributes
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,

  // Design constraints
  padding: 2, // Content stays within 2-22 range
  maxPaths: 4, // Maximum path elements per icon
  cornerRadius: 2, // Default rounded corner radius

  // Motion type recommendations
  motionHints: {
    // Icons with these characteristics should use these motions
    emotional: ["pulse", "scale"], // hearts, stars, favorites
    circular: ["rotate", "spin"], // settings, refresh, sync
    attention: ["shake", "bounce"], // bells, alerts, warnings
    directional: ["translate", "bounce"], // arrows, navigation
    reveal: ["draw"], // checkmarks, signatures, complex paths
    loading: ["spin"], // spinners, progress
  },
}

export const COMPONENT_TEMPLATE = `"use client"

import { motion } from "motion/react"
import { useIconAnimation } from "../hooks/useIconAnimation"
import type { IconProps } from "../lib/types"

export const {{NAME}} = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = '{{MOTION}}',
  trigger = 'hover',
  'aria-label': ariaLabel
}: IconProps) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger)
  const isDraw = motionType === 'draw'

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={\`\${className || ''} \${isDraw ? 'draw-animation' : ''}\`.trim()}
      {...(!isDraw ? animationProps : drawWrapperProps)}
      role={ariaLabel ? "img" : undefined}
      aria-label={ariaLabel}
      aria-hidden={ariaLabel ? undefined : true}
    >
{{ELEMENTS}}
    </motion.svg>
  )
}
`

export function generateComponent(
  name: string,
  elements: string[],
  defaultMotion: string = "scale"
): string {
  const elementsStr = elements
    .map((el) => `      ${el}`)
    .join("\n")

  return COMPONENT_TEMPLATE
    .replace("{{NAME}}", name)
    .replace("{{MOTION}}", defaultMotion)
    .replace("{{ELEMENTS}}", elementsStr)
}

export function toKebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/\s+/g, "-")
    .toLowerCase()
}

export function toPascalCase(str: string): string {
  return str
    .split(/[-_\s]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join("")
}
