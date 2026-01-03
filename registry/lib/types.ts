"use client";

import * as React from "react";

/**
 * Available motion/animation types for icons
 */
export type LivelyMotionType =
  | "scale" // Grow/shrink on hover
  | "rotate" // Spin on hover
  | "translate" // Move/slide on hover
  | "shake" // Shake/wobble on hover
  | "pulse" // Pulse/heartbeat effect
  | "bounce" // Bouncy spring effect
  | "draw" // SVG path drawing effect
  | "spin" // Continuous rotation
  | "none"; // No animation

/**
 * Animation trigger modes
 */
export type LivelyTriggerType =
  | "hover" // Animate on hover (default)
  | "loop" // Continuous looping animation
  | "mount" // Animate once on mount
  | "inView"; // Animate when scrolled into view

/**
 * Props for LivelyIcon components
 * Compatible with shadcn/ui patterns
 */
export interface LivelyIconProps extends React.SVGProps<SVGSVGElement> {
  /**
   * Size of the icon in pixels or CSS value
   * Uses CSS variable --lively-icon-size if not specified
   * @default 24
   */
  size?: number | string;

  /**
   * Stroke width for SVG paths
   * Uses CSS variable --lively-stroke-width if not specified
   * @default 2
   */
  strokeWidth?: number | string;

  /**
   * Whether the icon should be animated
   * Overrides context and system preferences
   */
  animated?: boolean;

  /**
   * The type of motion/animation to apply
   * @default varies per icon
   */
  lively?: LivelyMotionType;

  /**
   * When to trigger the animation
   * @default 'hover'
   */
  trigger?: LivelyTriggerType;
}

/**
 * Configuration for LivelyIcon provider
 */
export interface LivelyIconConfig {
  /**
   * Global animation toggle
   * @default true
   */
  animated: boolean;

  /**
   * Default size for all icons in pixels
   * @default 24
   */
  defaultSize: number;

  /**
   * Default stroke width for all icons
   * @default 2
   */
  defaultStrokeWidth: number;
}

/**
 * Motion preset interface for animations
 */
export interface LivelyMotionPreset {
  variants: {
    initial: Record<string, unknown>;
    hover: Record<string, unknown>;
  };
  transition: Record<string, unknown>;
}
