'use client';

/**
 * Hook for merging icon configuration from context with component props
 *
 * Provides the final computed configuration for an icon component,
 * respecting the priority: props > context defaults
 */

import { useIconContext } from '../context/IconContext';
import type { IconProps } from '../lib/types';
import { withDefault } from '../lib/utils';

/**
 * Return type for useIconConfig hook
 */
export interface UseIconConfigReturn {
  /**
   * Final computed size for the icon
   */
  size: number;

  /**
   * Final computed stroke width for the icon
   */
  strokeWidth: number;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Whether the icon should be animated
   */
  animated: boolean;
}

/**
 * Hook to merge icon props with context configuration
 *
 * Takes component props and merges them with context defaults.
 * Component props always take priority over context values.
 *
 * @param props - Icon component props
 * @returns Merged configuration with all values resolved
 *
 * @example
 * ```tsx
 * function MyIcon(props: IconProps) {
 *   const config = useIconConfig(props);
 *
 *   return (
 *     <svg
 *       width={config.size}
 *       height={config.size}
 *       strokeWidth={config.strokeWidth}
 *       className={config.className}
 *     />
 *   );
 * }
 * ```
 */
export function useIconConfig(props: IconProps): UseIconConfigReturn {
  const context = useIconContext();

  return {
    size: withDefault(props.size, context.defaultSize),
    strokeWidth: withDefault(props.strokeWidth, context.defaultStrokeWidth),
    className: props.className,
    animated: withDefault(props.animated, context.animated)
  };
}
