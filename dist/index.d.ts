import * as react from 'react';
import react__default, { ReactNode } from 'react';
import { Variants, Variant, Transition, TargetAndTransition, VariantLabels } from 'motion/react';

/**
 * Core type definitions for the MotionIcons library
 */

/**
 * Available motion/animation types for icons
 */
type MotionType = 'scale' | 'rotate' | 'translate' | 'shake' | 'pulse' | 'bounce' | 'draw' | 'spin' | 'none';
/**
 * Animation trigger modes
 */
type TriggerType = 'hover' | 'loop' | 'mount' | 'inView';
/**
 * Props for individual icon components
 */
interface IconProps {
    /**
     * Size of the icon in pixels
     * @default 24
     */
    size?: number;
    /**
     * Stroke width for SVG paths
     * @default 2
     */
    strokeWidth?: number;
    /**
     * Additional CSS classes to apply to the icon
     */
    className?: string;
    /**
     * Whether the icon should be animated
     * Overrides context and system preferences
     */
    animated?: boolean;
    /**
     * The type of motion/animation to apply
     * @default 'scale'
     */
    motionType?: MotionType;
    /**
     * When to trigger the animation
     * - 'hover': Animate on hover (default)
     * - 'loop': Continuous looping animation
     * - 'mount': Animate once on mount
     * - 'inView': Animate when scrolled into view
     * @default 'hover'
     */
    trigger?: TriggerType;
    /**
     * Accessible label for the icon
     * When provided, sets role="img" and aria-label
     * When omitted, icon is treated as decorative with aria-hidden="true"
     */
    'aria-label'?: string;
}
/**
 * Configuration for icon behavior and defaults
 */
interface IconConfig {
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
 * Animation variants for Motion components
 * Re-export of Motion's Variants type for consistency
 */
type AnimationVariants = Variants;
/**
 * Transition configuration for animations
 */
interface TransitionConfig {
    /**
     * Duration of the animation in seconds
     */
    duration?: number;
    /**
     * Easing function
     */
    ease?: string | number[];
    /**
     * Type of animation (spring, tween, etc.)
     */
    type?: string;
    /**
     * Spring stiffness
     */
    stiffness?: number;
    /**
     * Spring damping
     */
    damping?: number;
    /**
     * Delay before animation starts
     */
    delay?: number;
}
/**
 * Complete animation preset definition
 */
interface AnimationPreset {
    /**
     * Initial state
     */
    initial?: Variant;
    /**
     * Hover state
     */
    hover?: Variant;
    /**
     * Tap state
     */
    tap?: Variant;
    /**
     * Exit state
     */
    exit?: Variant;
    /**
     * Transition configuration
     */
    transition?: TransitionConfig;
}

/**
 * Icon configuration context for global icon settings
 *
 * Provides default configuration for all icons in the component tree.
 * Individual icon props can override context values.
 */

/**
 * Props for IconProvider component
 */
interface IconProviderProps {
    /**
     * Child components
     */
    children: ReactNode;
    /**
     * Icon configuration to apply to all icons in the tree
     * Partial configuration will be merged with defaults
     */
    config?: Partial<IconConfig>;
}
/**
 * Provider component for icon configuration
 *
 * Wrap your app or component tree with this provider to set global icon defaults.
 * Configuration can be partially overridden at any level.
 *
 * @example
 * ```tsx
 * <IconProvider config={{ animated: false, defaultSize: 32 }}>
 *   <App />
 * </IconProvider>
 * ```
 */
declare function IconProvider({ children, config }: IconProviderProps): react__default.JSX.Element;
/**
 * Hook to access icon context configuration
 *
 * Returns the current icon configuration from context, or default config if not in a provider.
 * This hook is used internally by icon components and other hooks.
 *
 * @returns Current icon configuration
 *
 * @example
 * ```tsx
 * const config = useIconContext();
 * console.log(config.defaultSize); // 24
 * ```
 */
declare function useIconContext(): IconConfig;

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

/**
 * Animation props to spread onto motion components based on trigger mode
 */
interface AnimationProps {
    initial?: boolean | TargetAndTransition | VariantLabels;
    animate?: boolean | TargetAndTransition | VariantLabels;
    whileHover?: TargetAndTransition | VariantLabels;
    whileInView?: TargetAndTransition | VariantLabels;
    viewport?: {
        once?: boolean;
        amount?: number;
    };
    variants?: Variants;
    transition?: Transition;
}
/**
 * Return type for useIconAnimation hook
 */
interface UseIconAnimationReturn {
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
declare function useIconAnimation(animated?: boolean, motionType?: MotionType, trigger?: TriggerType): UseIconAnimationReturn;

/**
 * Return type for useIconConfig hook
 */
interface UseIconConfigReturn {
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
declare function useIconConfig(props: IconProps): UseIconConfigReturn;

/**
 * Predefined animation presets for MotionIcons
 *
 * These presets can be used to apply consistent animations across icons.
 * Each preset includes initial, hover, tap, and transition configurations.
 */

/**
 * Draw animation - animates SVG path drawing
 * Useful for line-based icons
 */
declare const draw: AnimationPreset;
/**
 * Rotate animation - rotates icon on hover
 * Great for refresh, settings, or circular icons
 */
declare const rotate: AnimationPreset;
/**
 * Pulse animation - scales icon on hover
 * Ideal for drawing attention to interactive elements
 */
declare const pulse: AnimationPreset;
/**
 * Bounce animation - vertical bounce effect
 * Perfect for upvote, arrow, or notification icons
 */
declare const bounce: AnimationPreset;
/**
 * Translate animation - horizontal slide effect
 * Useful for arrow or navigation icons
 */
declare const translate: AnimationPreset;
/**
 * Stagger animation - sequential animation for multiple elements
 * Ideal for icons with multiple paths or shapes
 */
declare const stagger: AnimationPreset;
/**
 * Shake animation - horizontal shake effect
 * Good for error states, notifications, or alert icons
 */
declare const shake: AnimationPreset;
/**
 * Spin animation - continuous rotation
 * Perfect for loading or refresh icons
 */
declare const spin: AnimationPreset;
/**
 * Fade animation - opacity transition
 * Subtle effect for any icon
 */
declare const fade: AnimationPreset;
/**
 * Pop animation - scale with slight rotation
 * Engaging effect for important actions
 */
declare const pop: AnimationPreset;
/**
 * Collection of all animation presets
 */
declare const animations: {
    readonly draw: AnimationPreset;
    readonly rotate: AnimationPreset;
    readonly pulse: AnimationPreset;
    readonly bounce: AnimationPreset;
    readonly translate: AnimationPreset;
    readonly stagger: AnimationPreset;
    readonly shake: AnimationPreset;
    readonly spin: AnimationPreset;
    readonly fade: AnimationPreset;
    readonly pop: AnimationPreset;
};
/**
 * Type helper for animation preset names
 */
type AnimationName = keyof typeof animations;

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
declare function cn(...classes: (string | undefined | null | false)[]): string;
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
declare function mergeConfig<T extends Record<string, unknown>>(base: T, overrides: Partial<T>): T;
/**
 * Determines if a value is defined (not null or undefined)
 *
 * @param value - Value to check
 * @returns True if value is defined
 */
declare function isDefined<T>(value: T | null | undefined): value is T;
/**
 * Creates a stable object reference from potentially undefined values
 * Returns the fallback if the value is undefined
 *
 * @param value - Value to check
 * @param fallback - Fallback value
 * @returns Value or fallback
 */
declare function withDefault<T>(value: T | undefined, fallback: T): T;

declare const Accessibility: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const AlertCircle: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ArrowLeft: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ArrowRight: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Award: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Baby: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Bell: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Calendar: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Check: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const CheckCircle: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ChevronDown: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ChevronUp: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Clock: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Contact: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Contact2: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Copy: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Crown: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Download: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Edit: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Eye: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const EyeOff: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Frown: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Heart: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const HelpCircle: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Home: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Inbox: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Info: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Loader: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Lock: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Mail: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Meh: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Menu: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const MessageCircle: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Minus: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Phone: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Plus: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Refresh: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Save: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Search: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Send: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Settings: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Share: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Smile: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Star: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ThumbsDown: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ThumbsUp: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Trash: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Upload: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const User: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const UserCheck: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const UserCog: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const UserMinus: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const UserPlus: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const UserX: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Users: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const X: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const XCircle: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Cloud: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const File: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Filter: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Folder: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Grid: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const List: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const MoreHorizontal: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Bookmark: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Link: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const MapPin: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Moon: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Sun: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Tag: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Zap: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Play: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Pause: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Volume: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const VolumeOff: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Mic: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const MicOff: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Camera: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Airplay: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Cast: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const FastForward: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Film: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Headphones: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Music: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Radio: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Repeat: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Rewind: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Shuffle: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const SkipBack: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const SkipForward: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Speaker: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Tv: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Video: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Code: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Code2: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Terminal: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Command: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Database: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Server: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const HardDrive: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Cpu: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Wrench: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Hammer: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Screwdriver: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Palette: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Brush: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Pen: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Pencil: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const CloudRain: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const CloudSnow: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const CloudLightning: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const CloudDrizzle: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const CloudSun: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Sunrise: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Sunset: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Wind: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Thermometer: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Droplet: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Umbrella: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Snowflake: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Flame: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Leaf: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Tree: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ArrowUp: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ArrowDown: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ArrowUpRight: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ArrowUpLeft: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ArrowDownRight: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ArrowDownLeft: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ChevronsUp: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ChevronsDown: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ChevronsLeft: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ChevronsRight: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const CornerUpLeft: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const CornerUpRight: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const CornerDownLeft: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const CornerDownRight: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const MoveHorizontal: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Layout: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const LayoutGrid: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const LayoutList: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Sidebar: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const PanelLeft: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const PanelRight: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Maximize: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Minimize: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Maximize2: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Minimize2: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Columns: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Rows: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Square: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Circle: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Triangle: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const AtSign: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Hash: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const MessageSquare: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Send2: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const PhoneCall: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const PhoneOff: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const PhoneIncoming: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const PhoneOutgoing: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const PhoneMissed: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Voicemail: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Video2: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const VideoOff: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Rss: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Wifi: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const WifiOff: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Unlock: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Shield: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ShieldCheck: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ShieldOff: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Key: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Fingerprint: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Scan: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ScanLine: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const AlertTriangle: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const AlertOctagon: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Ban: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ShieldAlert: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const LockOpen: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const KeyRound: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const BadgeCheck: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ShoppingCart: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ShoppingBag: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const CreditCard: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const DollarSign: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Percent: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Receipt: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Wallet: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Gift: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Package: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Truck: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Store: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Barcode: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const QrCode: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Tag2: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Tags: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const FileText: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const FilePlus: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const FileMinus: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const FileCheck: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const FileX: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Files: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const FolderPlus: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const FolderMinus: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const FolderOpen: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Archive: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Clipboard: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ClipboardCheck: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ClipboardList: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ClipboardCopy: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Paperclip: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Activity: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const AreaChart: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const BarChart: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const BarChart2: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Gauge: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Kanban: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const LineChart: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const PieChart: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Presentation: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Signal: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const SignalHigh: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const SignalLow: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const SignalZero: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Table: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Table2: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const TrendingDown: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const TrendingUp: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Laptop: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Monitor: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Tablet: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Watch: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Printer: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Mouse: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Keyboard: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Smartphone: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Gamepad2: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Webcam: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Router: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const UsbDrive: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const SdCard: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Battery: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const BatteryCharging: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const BatteryLow: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Bluetooth: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const HeartPulse: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Stethoscope: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Pill: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Syringe: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Bandage: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Thermometer2: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Microscope: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const TestTube: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const TestTubes: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Dna: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Bone: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Brain: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Ear: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Eye2: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Hand: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Footprints: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Wheelchair: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const GraduationCap: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Book: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const BookOpen: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const BookMarked: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Library: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Notebook: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const NotebookPen: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Ruler: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const PenTool: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Highlighter: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Eraser: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Calculator: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Backpack: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Lightbulb: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const LightbulbOff: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Lamp: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const LampDesk: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Glasses: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Building: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Building2: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Factory: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Landmark: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Castle: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Church: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Hospital: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const School: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Warehouse: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Tent: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Mountain: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const MountainSnow: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Waves: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Anchor: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Compass: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Map: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Globe: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Trophy: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Medal: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Target: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Crosshair: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Dice1: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Dice2: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Dice3: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Dice4: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Dice5: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Dice6: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Puzzle: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Joystick: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Swords: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Sword: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Wand: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Wand2: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Dumbbell: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Coffee: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Cup: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Wine: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Beer: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Martini: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Pizza: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Apple: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Cherry: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Grape: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Banana: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Carrot: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Sandwich: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Utensils: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const UtensilsCrossed: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ChefHat: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Cookie: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const IceCream: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Car: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const CarFront: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Bus: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Train: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Plane: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const PlaneTakeoff: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const PlaneLanding: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Ship: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Sailboat: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Bike: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Rocket: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Fuel: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Parking: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const TrafficCone: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Navigation: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Navigation2: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Milestone: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

export { Accessibility, Activity, Airplay, AlertCircle, AlertOctagon, AlertTriangle, Anchor, type AnimationName, type AnimationPreset, type AnimationVariants, Apple, Archive, AreaChart, ArrowDown, ArrowDownLeft, ArrowDownRight, ArrowLeft, ArrowRight, ArrowUp, ArrowUpLeft, ArrowUpRight, AtSign, Award, Baby, Backpack, BadgeCheck, Ban, Banana, Bandage, BarChart, BarChart2, Barcode, Battery, BatteryCharging, BatteryLow, Beer, Bell, Bike, Bluetooth, Bone, Book, BookMarked, BookOpen, Bookmark, Brain, Brush, Building, Building2, Bus, Calculator, Calendar, Camera, Car, CarFront, Carrot, Cast, Castle, Check, CheckCircle, ChefHat, Cherry, ChevronDown, ChevronUp, ChevronsDown, ChevronsLeft, ChevronsRight, ChevronsUp, Church, Circle, Clipboard, ClipboardCheck, ClipboardCopy, ClipboardList, Clock, Cloud, CloudDrizzle, CloudLightning, CloudRain, CloudSnow, CloudSun, Code, Code2, Coffee, Columns, Command, Compass, Contact, Contact2, Cookie, Copy, CornerDownLeft, CornerDownRight, CornerUpLeft, CornerUpRight, Cpu, CreditCard, Crosshair, Crown, Cup, Database, Dice1, Dice2, Dice3, Dice4, Dice5, Dice6, Dna, DollarSign, Download, Droplet, Dumbbell, Ear, Edit, Eraser, Eye, Eye2, EyeOff, Factory, FastForward, File, FileCheck, FileMinus, FilePlus, FileText, FileX, Files, Film, Filter, Fingerprint, Flame, Folder, FolderMinus, FolderOpen, FolderPlus, Footprints, Frown, Fuel, Gamepad2, Gauge, Gift, Glasses, Globe, GraduationCap, Grape, Grid, Hammer, Hand, HardDrive, Hash, Headphones, Heart, HeartPulse, HelpCircle, Highlighter, Home, Hospital, IceCream, type IconConfig, type IconProps, IconProvider, type IconProviderProps, Inbox, Info, Joystick, Kanban, Key, KeyRound, Keyboard, Lamp, LampDesk, Landmark, Laptop, Layout, LayoutGrid, LayoutList, Leaf, Library, Lightbulb, LightbulbOff, LineChart, Link, List, Loader, Lock, LockOpen, Mail, Map, MapPin, Martini, Maximize, Maximize2, Medal, Meh, Menu, MessageCircle, MessageSquare, Mic, MicOff, Microscope, Milestone, Minimize, Minimize2, Minus, Monitor, Moon, MoreHorizontal, Mountain, MountainSnow, Mouse, MoveHorizontal, Music, Navigation, Navigation2, Notebook, NotebookPen, Package, Palette, PanelLeft, PanelRight, Paperclip, Parking, Pause, Pen, PenTool, Pencil, Percent, Phone, PhoneCall, PhoneIncoming, PhoneMissed, PhoneOff, PhoneOutgoing, PieChart, Pill, Pizza, Plane, PlaneLanding, PlaneTakeoff, Play, Plus, Presentation, Printer, Puzzle, QrCode, Radio, Receipt, Refresh, Repeat, Rewind, Rocket, Router, Rows, Rss, Ruler, Sailboat, Sandwich, Save, Scan, ScanLine, School, Screwdriver, SdCard, Search, Send, Send2, Server, Settings, Share, Shield, ShieldAlert, ShieldCheck, ShieldOff, Ship, ShoppingBag, ShoppingCart, Shuffle, Sidebar, Signal, SignalHigh, SignalLow, SignalZero, SkipBack, SkipForward, Smartphone, Smile, Snowflake, Speaker, Square, Star, Stethoscope, Store, Sun, Sunrise, Sunset, Sword, Swords, Syringe, Table, Table2, Tablet, Tag, Tag2, Tags, Target, Tent, Terminal, TestTube, TestTubes, Thermometer, Thermometer2, ThumbsDown, ThumbsUp, TrafficCone, Train, type TransitionConfig, Trash, Tree, TrendingDown, TrendingUp, Triangle, Trophy, Truck, Tv, Umbrella, Unlock, Upload, UsbDrive, type UseIconAnimationReturn, type UseIconConfigReturn, User, UserCheck, UserCog, UserMinus, UserPlus, UserX, Users, Utensils, UtensilsCrossed, Video, Video2, VideoOff, Voicemail, Volume, VolumeOff, Wallet, Wand, Wand2, Warehouse, Watch, Waves, Webcam, Wheelchair, Wifi, WifiOff, Wind, Wine, Wrench, X, XCircle, Zap, animations, bounce, cn, draw, fade, isDefined, mergeConfig, pop, pulse, rotate, shake, spin, stagger, translate, useIconAnimation, useIconConfig, useIconContext, withDefault };
