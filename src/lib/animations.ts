/**
 * Predefined animation presets for MotionIcons
 *
 * These presets can be used to apply consistent animations across icons.
 * Each preset includes initial, hover, tap, and transition configurations.
 */

import type { AnimationPreset } from './types';

/**
 * Draw animation - animates SVG path drawing
 * Useful for line-based icons
 */
export const draw: AnimationPreset = {
  initial: { pathLength: 0 },
  hover: { pathLength: 1 },
  transition: {
    duration: 0.4,
    ease: "easeInOut"
  }
};

/**
 * Rotate animation - rotates icon on hover
 * Great for refresh, settings, or circular icons
 */
export const rotate: AnimationPreset = {
  hover: { rotate: 180 },
  transition: {
    type: "spring",
    stiffness: 200
  }
};

/**
 * Pulse animation - scales icon on hover
 * Ideal for drawing attention to interactive elements
 */
export const pulse: AnimationPreset = {
  hover: { scale: 1.2 },
  transition: {
    type: "spring",
    stiffness: 400,
    damping: 10
  }
};

/**
 * Bounce animation - vertical bounce effect
 * Perfect for upvote, arrow, or notification icons
 */
export const bounce: AnimationPreset = {
  hover: { y: -2 },
  transition: {
    type: "spring",
    stiffness: 500
  }
};

/**
 * Translate animation - horizontal slide effect
 * Useful for arrow or navigation icons
 */
export const translate: AnimationPreset = {
  hover: { x: 3 },
  transition: {
    type: "spring",
    stiffness: 400,
    damping: 15
  }
};

/**
 * Stagger animation - sequential animation for multiple elements
 * Ideal for icons with multiple paths or shapes
 */
export const stagger: AnimationPreset = {
  initial: { opacity: 0, scale: 0.8 },
  hover: { opacity: 1, scale: 1 },
  transition: {
    duration: 0.3,
    ease: "easeOut"
  }
};

/**
 * Shake animation - horizontal shake effect
 * Good for error states, notifications, or alert icons
 */
export const shake: AnimationPreset = {
  hover: {
    x: [0, -4, 4, -4, 4, 0],
  },
  transition: {
    duration: 0.4,
    ease: "easeInOut"
  }
};

/**
 * Spin animation - continuous rotation
 * Perfect for loading or refresh icons
 */
export const spin: AnimationPreset = {
  hover: { rotate: 360 },
  transition: {
    duration: 0.6,
    ease: "linear"
  }
};

/**
 * Fade animation - opacity transition
 * Subtle effect for any icon
 */
export const fade: AnimationPreset = {
  initial: { opacity: 0.6 },
  hover: { opacity: 1 },
  transition: {
    duration: 0.2,
    ease: "easeInOut"
  }
};

/**
 * Pop animation - scale with slight rotation
 * Engaging effect for important actions
 */
export const pop: AnimationPreset = {
  hover: {
    scale: 1.15,
    rotate: 5
  },
  tap: {
    scale: 0.95
  },
  transition: {
    type: "spring",
    stiffness: 500,
    damping: 15
  }
};

/**
 * Collection of all animation presets
 */
export const animations = {
  draw,
  rotate,
  pulse,
  bounce,
  translate,
  stagger,
  shake,
  spin,
  fade,
  pop
} as const;

/**
 * Type helper for animation preset names
 */
export type AnimationName = keyof typeof animations;
