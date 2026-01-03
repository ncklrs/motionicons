import React, { memo, useCallback, useState } from 'react';
import { renderSvgElements, defaultSvgAttributes, type SVGElementDef } from '../utils/renderSvgElements';

/**
 * Icon data structure matching the icons.json format
 */
export interface IconData {
  id: string;
  name: string;
  elements: SVGElementDef[];
  viewBox: string;
  categories: string[];
  tags: string[];
  defaultMotionType: string;
}

export interface IconCardProps {
  /** Icon data to render */
  icon: IconData;
  /** Whether this card is currently selected */
  isSelected: boolean;
  /** Click handler for selection */
  onClick: () => void;
  /** Optional animation class to apply on hover */
  animationClass?: string;
  /** Style overrides for positioning in virtual grid */
  style?: React.CSSProperties;
  /** Tab index for keyboard navigation */
  tabIndex?: number;
  /** Handler for keyboard navigation */
  onKeyDown?: (e: React.KeyboardEvent) => void;
}

/**
 * Individual icon card component
 * Renders SVG from icon.elements data with hover animation preview
 */
export const IconCard = memo(function IconCard({
  icon,
  isSelected,
  onClick,
  animationClass,
  style,
  tabIndex = 0,
  onKeyDown,
}: IconCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      // Handle Enter/Space for selection
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onClick();
      }
      // Pass other keys to parent handler for grid navigation
      onKeyDown?.(e);
    },
    [onClick, onKeyDown]
  );

  // Get viewBox or use default
  const viewBox = icon.viewBox || '0 0 24 24';

  // Determine animation class to apply
  const activeAnimationClass = isHovered && animationClass ? animationClass : '';

  return (
    <button
      className={`icon-card ${isSelected ? 'selected' : ''} ${activeAnimationClass}`}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onKeyDown={handleKeyDown}
      style={style}
      tabIndex={tabIndex}
      title={icon.name}
      aria-label={`${icon.name} icon`}
      aria-selected={isSelected}
      role="gridcell"
    >
      <div className="icon-card-preview">
        <svg
          {...defaultSvgAttributes}
          viewBox={viewBox}
          className={`icon-svg ${activeAnimationClass}`}
          aria-hidden="true"
        >
          {renderSvgElements(icon.elements)}
        </svg>
      </div>
      <span className="icon-card-name">{icon.name}</span>
    </button>
  );
});

export default IconCard;
