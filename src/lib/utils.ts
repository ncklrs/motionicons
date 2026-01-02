/**
 * Utility functions for the MotionIcons library
 */

/**
 * Merges multiple class names into a single string
 * Filters out falsy values for conditional classes
 *
 * @param classes - Class names to merge
 * @returns Merged class string
 *
 * @example
 * ```ts
 * cn('base-class', isActive && 'active', 'another-class')
 * // Returns: "base-class active another-class"
 * ```
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Merges two objects with deep property override
 * Later values override earlier ones
 *
 * @param base - Base configuration object
 * @param overrides - Override values
 * @returns Merged configuration
 *
 * @example
 * ```ts
 * mergeConfig({ size: 24, animated: true }, { size: 32 })
 * // Returns: { size: 32, animated: true }
 * ```
 */
export function mergeConfig<T extends Record<string, unknown>>(
  base: T,
  overrides: Partial<T>
): T {
  return { ...base, ...overrides };
}

/**
 * Determines if a value is defined (not null or undefined)
 *
 * @param value - Value to check
 * @returns True if value is defined
 */
export function isDefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

/**
 * Creates a stable object reference from potentially undefined values
 * Returns the fallback if the value is undefined
 *
 * @param value - Value to check
 * @param fallback - Fallback value
 * @returns Value or fallback
 */
export function withDefault<T>(value: T | undefined, fallback: T): T {
  return isDefined(value) ? value : fallback;
}
