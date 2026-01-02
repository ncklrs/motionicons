'use client';

/**
 * Hook for managing icon animation state and variants
 *
 * Handles the priority chain:
 * 1. Component prop (highest priority)
 * 2. Context configuration
 * 3. System preference (via useReducedMotion)
 *
 * When animations are disabled, returns null variants to prevent motion.
 */

import { useReducedMotion, type Transition, type TargetAndTransition, type VariantLabels, type Variants } from 'motion/react';
import { useIconContext } from '../context/IconContext';
import type { AnimationVariants, TransitionConfig, MotionType, TriggerType } from '../lib/types';
import { getMotionPreset } from '../lib/motion-presets';

/**
 * Animation props to spread onto motion components based on trigger mode
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
 * Return type for useIconAnimation hook
 */
export interface UseIconAnimationReturn {
  /**
   * Whether animations should be active
   */
  isAnimated: boolean;

  /**
   * Get animation variants based on animation state
   * Returns undefined when animations are disabled
   */
  getVariants: (variants: AnimationVariants) => AnimationVariants | undefined;

  /**
   * Get transition configuration
   */
  transition: TransitionConfig | undefined;

  /**
   * Pre-built variants from the motion preset (based on motionType)
   */
  presetVariants: AnimationVariants | undefined;

  /**
   * Pre-built transition from the motion preset
   */
  presetTransition: Transition;

  /**
   * Animation props to spread onto the motion.svg component
   * Based on trigger mode (hover, loop, mount, inView)
   */
  animationProps: AnimationProps;

  /**
   * Animation props for internal path elements (for draw animation)
   */
  pathAnimationProps: AnimationProps;

  /**
   * Animation props for SVG wrapper when using draw animation
   * Needed to propagate hover/inView state to children
   */
  drawWrapperProps: AnimationProps;
}

/**
 * Hook to determine animation state and provide variant helpers
 *
 * Priority order (highest to lowest):
 * 1. Component animated prop
 * 2. Context animated setting
 * 3. System prefers-reduced-motion preference
 *
 * @param animated - Optional override from component props
 * @param motionType - Optional motion type to use preset variants
 * @returns Animation state and helper functions
 *
 * @example
 * ```tsx
 * // Using custom variants
 * const { isAnimated, getVariants } = useIconAnimation(props.animated);
 *
 * return (
 *   <motion.svg
 *     variants={getVariants({ hover: { scale: 1.2 } })}
 *     animate={isAnimated ? "hover" : undefined}
 *   />
 * );
 *
 * // Using preset motion type
 * const { isAnimated, presetVariants, presetTransition } = useIconAnimation(
 *   props.animated,
 *   props.motionType
 * );
 *
 * return (
 *   <motion.svg
 *     variants={presetVariants}
 *     transition={presetTransition}
 *     whileHover={isAnimated ? "hover" : undefined}
 *   />
 * );
 * ```
 */
export function useIconAnimation(
  animated?: boolean,
  motionType: MotionType = 'scale',
  trigger: TriggerType = 'hover'
): UseIconAnimationReturn {
  const context = useIconContext();
  const prefersReducedMotion = useReducedMotion();

  // Get the motion preset based on type
  const preset = getMotionPreset(motionType);

  /**
   * Determine final animation state
   * Priority: prop > context > system preference
   */
  const isAnimated = (() => {
    // Component prop has highest priority
    if (animated !== undefined) {
      return animated;
    }

    // Context configuration is next
    if (!context.animated) {
      return false;
    }

    // System preference has lowest priority
    // If user prefers reduced motion, disable animations
    if (prefersReducedMotion) {
      return false;
    }

    // Default to true if all checks pass
    return true;
  })();

  /**
   * Returns variants or undefined based on animation state
   */
  const getVariants = (variants: AnimationVariants): AnimationVariants | undefined => {
    if (!isAnimated) {
      return undefined;
    }
    return variants;
  };

  /**
   * Get transition configuration if animations are enabled
   */
  const transition: TransitionConfig | undefined = isAnimated
    ? undefined // Let variants define their own transitions
    : { duration: 0 }; // Disable transitions when animations are off

  /**
   * Get preset variants based on motion type
   */
  const presetVariants: AnimationVariants | undefined = isAnimated
    ? preset.variants
    : undefined;

  /**
   * Build animation props based on trigger mode
   */
  const getAnimationProps = (): AnimationProps => {
    if (!isAnimated) {
      return { initial: 'initial', variants: preset.variants };
    }

    // Create looping transition for continuous animations
    const loopTransition: Transition = {
      ...preset.transition,
      repeat: Infinity,
      repeatType: 'loop' as const
    };

    switch (trigger) {
      case 'hover':
        return {
          initial: 'initial',
          whileHover: 'hover',
          variants: preset.variants,
          transition: preset.transition
        };

      case 'loop':
        return {
          initial: 'initial',
          animate: 'hover',
          variants: preset.variants,
          transition: loopTransition
        };

      case 'mount':
        return {
          initial: 'initial',
          animate: 'hover',
          variants: preset.variants,
          transition: preset.transition
        };

      case 'inView':
        return {
          initial: 'initial',
          whileInView: 'hover',
          viewport: { once: true, amount: 0.5 },
          variants: preset.variants,
          transition: preset.transition
        };

      default:
        return {
          initial: 'initial',
          whileHover: 'hover',
          variants: preset.variants,
          transition: preset.transition
        };
    }
  };

  /**
   * Build path animation props for draw effect
   * Uses variants so parent hover triggers child animations
   */
  const getPathAnimationProps = (): AnimationProps => {
    if (!isAnimated || motionType !== 'draw') {
      return {};
    }

    const drawTransition: Transition = {
      duration: 1.5,
      ease: 'easeInOut' as const
    };


    // Variants for draw - starts fully visible, redraws on hover
    const drawVariants: Variants = {
      initial: { pathLength: 1, opacity: 1 },
      hover: {
        pathLength: [1, 0, 1],
        opacity: 1
      }
    };

    // Variants for inView - draws in when scrolled into view
    const drawInViewVariants: Variants = {
      initial: { pathLength: 0, opacity: 0.3 },
      hover: { pathLength: 1, opacity: 1 }
    };

    switch (trigger) {
      case 'hover':
        return {
          variants: drawVariants,
          initial: 'initial',
          transition: { duration: 0.8, ease: 'easeInOut' as const }
        };

      case 'loop':
        return {
          initial: { pathLength: 0, opacity: 0.5 },
          animate: { pathLength: [0, 1, 1, 0], opacity: [0.5, 1, 1, 0.5] },
          transition: {
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut' as const,
            times: [0, 0.4, 0.6, 1]
          }
        };

      case 'mount':
        return {
          initial: { pathLength: 0, opacity: 0.3 },
          animate: { pathLength: 1, opacity: 1 },
          transition: drawTransition
        };

      case 'inView':
        return {
          variants: drawInViewVariants,
          initial: 'initial',
          transition: drawTransition
        };

      default:
        return {};
    }
  };

  /**
   * Build SVG wrapper props for draw effect
   * Parent needs whileHover/whileInView to propagate to children
   */
  const getDrawWrapperProps = (): AnimationProps => {
    if (!isAnimated || motionType !== 'draw') {
      return {};
    }

    switch (trigger) {
      case 'hover':
        return {
          initial: 'initial',
          whileHover: 'hover'
        };

      case 'inView':
        return {
          initial: 'initial',
          whileInView: 'hover',
          viewport: { once: true, amount: 0.5 }
        };

      default:
        return {};
    }
  };

  const result = {
    isAnimated,
    getVariants,
    transition,
    presetVariants,
    presetTransition: preset.transition,
    animationProps: getAnimationProps(),
    pathAnimationProps: getPathAnimationProps(),
    drawWrapperProps: getDrawWrapperProps()
  };

  return result;
}
