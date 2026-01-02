/**
 * Library utilities barrel export
 *
 * Exports types, animations, and utility functions
 */

// Types
export type {
  IconProps,
  IconConfig,
  AnimationVariants,
  TransitionConfig,
  AnimationPreset
} from './types';

// Animations
export { animations } from './animations';
export type { AnimationName } from './animations';

// Individual animation presets for direct import
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
} from './animations';

// Utilities
export { cn, mergeConfig, isDefined, withDefault } from './utils';
