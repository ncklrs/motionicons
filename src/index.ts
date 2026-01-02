/**
 * MotionIcons - Main library entry point
 *
 * A comprehensive library of animated icons powered by Motion for React
 *
 * @packageDocumentation
 */

// Context
export { IconProvider, useIconContext } from './context';
export type { IconProviderProps } from './context';

// Hooks
export { useIconAnimation, useIconConfig } from './hooks';
export type { UseIconAnimationReturn, UseIconConfigReturn } from './hooks';

// Types
export type {
  IconProps,
  IconConfig,
  AnimationVariants,
  TransitionConfig,
  AnimationPreset
} from './lib';

// Animations
export { animations } from './lib';
export type { AnimationName } from './lib';

// Individual animation presets
export {
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
} from './lib';

// Utilities
export { cn, mergeConfig, isDefined, withDefault } from './lib';

// Icons - export all 350 icons
export * from './icons';
