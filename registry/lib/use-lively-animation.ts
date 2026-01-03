"use client";

import {
  useReducedMotion,
  type Transition,
  type TargetAndTransition,
  type VariantLabels,
  type Variants,
} from "motion/react";
import { useLivelyContext } from "@/lib/lively-provider";
import type { LivelyMotionType, LivelyTriggerType } from "@/lib/lively-types";

/**
 * Motion preset interface
 */
interface MotionPreset {
  variants: Variants;
  transition: Transition;
}

/**
 * Spring transition presets
 */
const springBouncy: Transition = {
  type: "spring",
  stiffness: 400,
  damping: 10,
};

const springSoft: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 20,
};

const springSnappy: Transition = {
  type: "spring",
  stiffness: 500,
  damping: 25,
};

/**
 * All available motion presets
 */
const motionPresets: Record<LivelyMotionType, MotionPreset> = {
  scale: {
    variants: {
      initial: { scale: 1 },
      hover: { scale: 1.15 },
    },
    transition: springBouncy,
  },

  rotate: {
    variants: {
      initial: { rotate: 0 },
      hover: { rotate: 180 },
    },
    transition: springSoft,
  },

  translate: {
    variants: {
      initial: { x: 0, y: 0 },
      hover: { x: 2, y: -2 },
    },
    transition: springSnappy,
  },

  shake: {
    variants: {
      initial: { x: 0 },
      hover: { x: [0, -3, 3, -3, 3, 0] },
    },
    transition: { duration: 0.4 },
  },

  pulse: {
    variants: {
      initial: { scale: 1, opacity: 1 },
      hover: {
        scale: [1, 1.1, 1],
        opacity: [1, 0.8, 1],
      },
    },
    transition: {
      duration: 0.6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },

  bounce: {
    variants: {
      initial: { y: 0 },
      hover: { y: [0, -6, 0] },
    },
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
      times: [0, 0.5, 1],
    },
  },

  draw: {
    variants: {
      initial: { opacity: 0.4, scale: 0.9 },
      hover: { opacity: 1, scale: 1 },
    },
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1],
    },
  },

  spin: {
    variants: {
      initial: { rotate: 0 },
      hover: { rotate: 360 },
    },
    transition: {
      duration: 0.8,
      ease: "linear",
      repeat: Infinity,
    },
  },

  none: {
    variants: {
      initial: {},
      hover: {},
    },
    transition: { duration: 0 },
  },
};

/**
 * Animation props for motion components
 */
export interface AnimationProps {
  initial?: boolean | TargetAndTransition | VariantLabels;
  animate?: boolean | TargetAndTransition | VariantLabels;
  whileHover?: TargetAndTransition | VariantLabels;
  whileInView?: TargetAndTransition | VariantLabels;
  viewport?: { once?: boolean; amount?: number };
  variants?: Variants;
  transition?: Transition;
}

/**
 * Return type for useLivelyAnimation hook
 */
export interface UseLivelyAnimationReturn {
  isAnimated: boolean;
  animationProps: AnimationProps;
  pathAnimationProps: AnimationProps;
  drawWrapperProps: AnimationProps;
}

/**
 * Hook for managing Lively icon animation state
 *
 * Handles the priority chain:
 * 1. Component prop (highest priority)
 * 2. Context configuration
 * 3. System preference (via useReducedMotion)
 */
export function useLivelyAnimation(
  animated?: boolean,
  lively: LivelyMotionType = "scale",
  trigger: LivelyTriggerType = "hover"
): UseLivelyAnimationReturn {
  const context = useLivelyContext();
  const prefersReducedMotion = useReducedMotion();

  const preset = motionPresets[lively] || motionPresets.scale;

  /**
   * Determine final animation state
   */
  const isAnimated = (() => {
    if (animated !== undefined) {
      return animated;
    }
    if (!context.animated) {
      return false;
    }
    if (prefersReducedMotion) {
      return false;
    }
    return true;
  })();

  /**
   * Build animation props based on trigger mode
   */
  const getAnimationProps = (): AnimationProps => {
    if (!isAnimated) {
      return { initial: "initial", variants: preset.variants };
    }

    const loopTransition: Transition = {
      ...preset.transition,
      repeat: Infinity,
      repeatType: "loop" as const,
    };

    switch (trigger) {
      case "hover":
        return {
          initial: "initial",
          whileHover: "hover",
          variants: preset.variants,
          transition: preset.transition,
        };

      case "loop":
        return {
          initial: "initial",
          animate: "hover",
          variants: preset.variants,
          transition: loopTransition,
        };

      case "mount":
        return {
          initial: "initial",
          animate: "hover",
          variants: preset.variants,
          transition: preset.transition,
        };

      case "inView":
        return {
          initial: "initial",
          whileInView: "hover",
          viewport: { once: true, amount: 0.5 },
          variants: preset.variants,
          transition: preset.transition,
        };

      default:
        return {
          initial: "initial",
          whileHover: "hover",
          variants: preset.variants,
          transition: preset.transition,
        };
    }
  };

  /**
   * Build path animation props for draw effect
   */
  const getPathAnimationProps = (): AnimationProps => {
    if (!isAnimated || lively !== "draw") {
      return {};
    }

    const drawTransition: Transition = {
      duration: 1.5,
      ease: "easeInOut" as const,
    };

    const drawVariants: Variants = {
      initial: { pathLength: 1, opacity: 1 },
      hover: {
        pathLength: [1, 0, 1],
        opacity: 1,
        transition: {
          duration: 1.2,
          ease: "easeInOut",
          times: [0, 0.5, 1],
        },
      },
    };

    const drawInViewVariants: Variants = {
      initial: { pathLength: 0, opacity: 0.3 },
      hover: {
        pathLength: 1,
        opacity: 1,
        transition: {
          duration: 1.5,
          ease: "easeInOut",
        },
      },
    };

    switch (trigger) {
      case "hover":
        return {
          variants: drawVariants,
          initial: "initial",
        };

      case "loop":
        return {
          initial: { pathLength: 0, opacity: 0.5 },
          animate: { pathLength: [0, 1, 1, 0], opacity: [0.5, 1, 1, 0.5] },
          transition: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut" as const,
            times: [0, 0.4, 0.6, 1],
          },
        };

      case "mount":
        return {
          initial: { pathLength: 0, opacity: 0.3 },
          animate: { pathLength: 1, opacity: 1 },
          transition: drawTransition,
        };

      case "inView":
        return {
          variants: drawInViewVariants,
          initial: "initial",
        };

      default:
        return {};
    }
  };

  /**
   * Build SVG wrapper props for draw effect
   */
  const getDrawWrapperProps = (): AnimationProps => {
    if (!isAnimated || lively !== "draw") {
      return {};
    }

    switch (trigger) {
      case "hover":
        return {
          initial: "initial",
          whileHover: "hover",
        };

      case "inView":
        return {
          initial: "initial",
          whileInView: "hover",
          viewport: { once: true, amount: 0.5 },
        };

      default:
        return {};
    }
  };

  return {
    isAnimated,
    animationProps: getAnimationProps(),
    pathAnimationProps: getPathAnimationProps(),
    drawWrapperProps: getDrawWrapperProps(),
  };
}
