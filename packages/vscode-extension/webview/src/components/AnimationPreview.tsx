import { useState, useCallback, useEffect, useRef, useMemo } from 'react';

/**
 * Motion types supported by the preview
 */
export type MotionType =
  | 'scale'
  | 'rotate'
  | 'translate'
  | 'shake'
  | 'pulse'
  | 'bounce'
  | 'draw'
  | 'spin'
  | 'none';

/**
 * Trigger modes for animations
 */
export type TriggerMode = 'hover' | 'click' | 'loop' | 'mount' | 'none';

/**
 * Props for the AnimationPreview component
 */
export interface AnimationPreviewProps {
  /**
   * SVG content to render (raw SVG string from trusted extension bundle)
   */
  icon: string;

  /**
   * The motion type to apply
   * @default 'scale'
   */
  lively?: MotionType;

  /**
   * How the animation is triggered
   * @default 'hover'
   */
  trigger?: TriggerMode;

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
   * Color for the icon
   * @default 'currentColor'
   */
  color?: string;

  /**
   * Additional CSS class name
   */
  className?: string;

  /**
   * Show play button for one-shot animations
   * @default true for click trigger
   */
  showPlayButton?: boolean;

  /**
   * Callback when animation completes
   */
  onAnimationEnd?: () => void;

  /**
   * Accessible label for the icon
   */
  'aria-label'?: string;
}

/**
 * Calculates approximate path length for SVG elements
 */
function calculatePathLength(svgContent: string): number {
  // Rough estimate based on viewBox and complexity
  // In a real implementation, we'd parse the SVG and calculate actual path lengths
  const pathMatches = svgContent.match(/<path[^>]*d="([^"]+)"/gi);
  const lineMatches = svgContent.match(/<line/gi);
  const circleMatches = svgContent.match(/<circle/gi);
  const polylineMatches = svgContent.match(/<polyline/gi);

  let totalLength = 0;

  // Paths - estimate based on command count
  if (pathMatches) {
    pathMatches.forEach((path) => {
      const dMatch = path.match(/d="([^"]+)"/);
      if (dMatch) {
        const commands = dMatch[1].match(/[a-zA-Z]/g);
        totalLength += (commands?.length || 1) * 15;
      }
    });
  }

  // Lines - typically short
  if (lineMatches) {
    totalLength += lineMatches.length * 25;
  }

  // Circles - circumference approximation
  if (circleMatches) {
    totalLength += circleMatches.length * 50;
  }

  // Polylines - estimate
  if (polylineMatches) {
    totalLength += polylineMatches.length * 40;
  }

  // Default minimum
  return Math.max(totalLength, 100);
}

/**
 * Processes SVG content to add necessary attributes for animations
 */
function processSvgContent(
  svgContent: string,
  size: number,
  strokeWidth: number,
  color: string,
  pathLength: number
): string {
  // Parse and modify the SVG
  let processed = svgContent;

  // Update width/height
  processed = processed.replace(/width="[^"]*"/, `width="${size}"`);
  processed = processed.replace(/height="[^"]*"/, `height="${size}"`);

  // If no width/height, add them
  if (!processed.includes('width=')) {
    processed = processed.replace('<svg', `<svg width="${size}"`);
  }
  if (!processed.includes('height=')) {
    processed = processed.replace('<svg', `<svg height="${size}"`);
  }

  // Update stroke-width
  processed = processed.replace(/stroke-width="[^"]*"/g, `stroke-width="${strokeWidth}"`);

  // Update stroke color
  if (color !== 'currentColor') {
    processed = processed.replace(/stroke="currentColor"/g, `stroke="${color}"`);
  }

  // Add path-length CSS variable for draw animations
  processed = processed.replace(
    '<svg',
    `<svg style="--path-length: ${pathLength}"`
  );

  return processed;
}

/**
 * Renders trusted SVG content from the extension's icon bundle.
 *
 * Security Note: This component renders SVG using innerHTML. This is safe because:
 * 1. The SVG content is sourced exclusively from the extension's bundled icon library
 * 2. User-provided content is never rendered through this component
 * 3. This pattern matches the existing App.tsx implementation
 */
function renderTrustedSvg(svgContent: string): JSX.Element {
  // eslint-disable-next-line react/no-danger
  return <div dangerouslySetInnerHTML={{ __html: svgContent }} />;
}

/**
 * AnimationPreview Component
 *
 * Renders an icon SVG with CSS-based animations that replicate
 * the 9 MotionIcons motion presets for preview purposes.
 *
 * Security Note: This component uses dangerouslySetInnerHTML to render SVG icons.
 * The SVG content is sourced exclusively from the extension's bundled icon library,
 * which is a trusted source. User-provided content is never rendered this way.
 */
export function AnimationPreview({
  icon,
  lively = 'scale',
  trigger = 'hover',
  size = 24,
  strokeWidth = 2,
  color = 'currentColor',
  className = '',
  showPlayButton,
  onAnimationEnd,
  'aria-label': ariaLabel,
}: AnimationPreviewProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Calculate path length for draw animations
  const pathLength = useMemo(() => calculatePathLength(icon), [icon]);

  // Process SVG content
  const processedSvg = useMemo(
    () => processSvgContent(icon, size, strokeWidth, color, pathLength),
    [icon, size, strokeWidth, color, pathLength]
  );

  // Determine if play button should be shown
  const shouldShowPlayButton = showPlayButton ?? trigger === 'click';

  // Get animation class based on motion type and trigger
  const getAnimationClass = useCallback((): string => {
    if (lively === 'none') {
      return 'animate-none';
    }

    switch (trigger) {
      case 'hover':
        return `animate-${lively}`;
      case 'loop':
        return `animate-${lively}-loop`;
      case 'click':
        return `animate-${lively}-click${isAnimating ? ' animating' : ''}`;
      case 'mount':
        return hasPlayed ? '' : `animate-${lively}-mount`;
      case 'none':
        return '';
      default:
        return `animate-${lively}`;
    }
  }, [lively, trigger, isAnimating, hasPlayed]);

  // Handle click animation trigger
  const handleClick = useCallback(() => {
    if (trigger === 'click' && !isAnimating) {
      setIsAnimating(true);
    }
  }, [trigger, isAnimating]);

  // Handle play button click
  const handlePlayClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!isAnimating) {
        setIsAnimating(true);
      }
    },
    [isAnimating]
  );

  // Handle animation end
  const handleAnimationEnd = useCallback(() => {
    setIsAnimating(false);
    setHasPlayed(true);
    onAnimationEnd?.();
  }, [onAnimationEnd]);

  // Reset animation state when motion type or trigger changes
  useEffect(() => {
    setIsAnimating(false);
    setHasPlayed(false);
  }, [lively, trigger]);

  // Handle mount animation
  useEffect(() => {
    if (trigger === 'mount' && !hasPlayed) {
      // Small delay to ensure CSS is applied
      const timer = setTimeout(() => {
        setHasPlayed(true);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [trigger, hasPlayed]);

  // Animation classes
  const animationClass = getAnimationClass();
  const combinedClassName = [
    'animation-preview',
    animationClass,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className="animation-preview-wrapper"
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
      }}
    >
      <div
        ref={containerRef}
        className={combinedClassName}
        onClick={trigger === 'click' ? handleClick : undefined}
        onAnimationEnd={handleAnimationEnd}
        role={ariaLabel ? 'img' : 'presentation'}
        aria-label={ariaLabel}
        aria-hidden={!ariaLabel}
        style={{
          color,
          cursor: trigger === 'click' ? 'pointer' : 'default',
          width: size,
          height: size,
        }}
      >
        {renderTrustedSvg(processedSvg)}
      </div>

      {shouldShowPlayButton && (
        <button
          type="button"
          className="animation-play-button"
          onClick={handlePlayClick}
          disabled={isAnimating}
          aria-label="Play animation"
          style={{
            padding: '4px 12px',
            fontSize: '11px',
            backgroundColor: 'var(--vscode-button-secondaryBackground, #3a3d41)',
            color: 'var(--vscode-button-secondaryForeground, #cccccc)',
            border: 'none',
            borderRadius: '4px',
            cursor: isAnimating ? 'not-allowed' : 'pointer',
            opacity: isAnimating ? 0.6 : 1,
            transition: 'opacity 0.15s ease, background-color 0.15s ease',
          }}
          onMouseEnter={(e) => {
            if (!isAnimating) {
              e.currentTarget.style.backgroundColor =
                'var(--vscode-button-secondaryHoverBackground, #45494e)';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor =
              'var(--vscode-button-secondaryBackground, #3a3d41)';
          }}
        >
          {isAnimating ? 'Playing...' : 'Play'}
        </button>
      )}
    </div>
  );
}

/**
 * Hook to get animation class for a given motion type and trigger
 * Useful for applying animations to custom elements
 */
export function useAnimationClass(
  lively: MotionType,
  trigger: TriggerMode,
  isAnimating = false
): string {
  if (lively === 'none') {
    return 'animate-none';
  }

  switch (trigger) {
    case 'hover':
      return `animate-${lively}`;
    case 'loop':
      return `animate-${lively}-loop`;
    case 'click':
      return `animate-${lively}-click${isAnimating ? ' animating' : ''}`;
    case 'mount':
      return `animate-${lively}-mount`;
    case 'none':
      return '';
    default:
      return `animate-${lively}`;
  }
}

/**
 * List of all motion types with labels for UI
 */
export const livelyOptions: { value: MotionType; label: string; description: string }[] = [
  { value: 'scale', label: 'Scale', description: 'Grow on hover' },
  { value: 'rotate', label: 'Rotate', description: '180 degree rotation' },
  { value: 'translate', label: 'Translate', description: 'Slide movement' },
  { value: 'shake', label: 'Shake', description: 'Wobble effect' },
  { value: 'pulse', label: 'Pulse', description: 'Heartbeat rhythm' },
  { value: 'bounce', label: 'Bounce', description: 'Bouncy spring' },
  { value: 'draw', label: 'Draw', description: 'Path reveal' },
  { value: 'spin', label: 'Spin', description: 'Full rotation' },
  { value: 'none', label: 'None', description: 'No animation' },
];

/**
 * List of trigger modes with labels for UI
 */
export const triggerModeOptions: { value: TriggerMode; label: string; description: string }[] = [
  { value: 'hover', label: 'Hover', description: 'Animate on mouse hover' },
  { value: 'click', label: 'Click', description: 'Animate on click' },
  { value: 'loop', label: 'Loop', description: 'Continuous animation' },
  { value: 'mount', label: 'Mount', description: 'Animate once on load' },
  { value: 'none', label: 'None', description: 'No animation' },
];

export default AnimationPreview;
