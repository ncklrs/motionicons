import { useCallback, useRef, useEffect } from 'react';
import type { IconMetadata } from '../types';
import { TrustedSvgRenderer } from './TrustedSvgRenderer';
import './FavoritesBar.css';

export interface FavoritesBarProps {
  /** List of favorite icon names */
  favorites: string[];
  /** All available icons (to look up by name) */
  icons: IconMetadata[];
  /** Callback when an icon is selected */
  onSelect: (icon: IconMetadata) => void;
}

/**
 * Horizontal bar showing favorite icons with quick access
 */
export function FavoritesBar({ favorites, icons, onSelect }: FavoritesBarProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  /**
   * Get icon metadata by name
   */
  const getIconByName = useCallback(
    (name: string): IconMetadata | undefined => {
      return icons.find((icon) => icon.name === name);
    },
    [icons]
  );

  /**
   * Handle horizontal scroll with mouse wheel
   */
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        container.scrollLeft += e.deltaY;
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, []);

  /**
   * Handle keyboard navigation
   */
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, icon: IconMetadata) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onSelect(icon);
      }
    },
    [onSelect]
  );

  // Don't render if no favorites
  if (favorites.length === 0) {
    return (
      <div className="favorites-bar favorites-bar-empty">
        <div className="favorites-empty-state">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="favorites-empty-icon"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
          <span className="favorites-empty-text">No favorites yet</span>
        </div>
      </div>
    );
  }

  // Get favorite icons that exist
  const favoriteIcons = favorites
    .map((name) => getIconByName(name))
    .filter((icon): icon is IconMetadata => icon !== undefined);

  return (
    <div className="favorites-bar">
      <div className="favorites-label">
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="2"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
        <span>Favorites</span>
      </div>
      <div className="favorites-scroll-container" ref={scrollContainerRef}>
        <div className="favorites-list">
          {favoriteIcons.map((icon) => (
            <button
              key={icon.name}
              className="favorites-item"
              onClick={() => onSelect(icon)}
              onKeyDown={(e) => handleKeyDown(e, icon)}
              title={icon.displayName}
              type="button"
              aria-label={`Select ${icon.displayName}`}
            >
              <div className="favorites-item-preview">
                <TrustedSvgRenderer svgContent={icon.svgContent} size={24} />
              </div>
              <span className="favorites-item-badge" aria-hidden="true">
                <svg
                  width="8"
                  height="8"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
