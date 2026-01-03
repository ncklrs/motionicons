import { useCallback } from 'react';
import type { IconMetadata, IconCustomization, MotionType } from '../types';
import { CustomizationPanel } from './CustomizationPanel';
import { CodePreview } from './CodePreview';
import { TrustedSvgRenderer } from './TrustedSvgRenderer';
import './DetailPanel.css';

/**
 * Extended customization options for the detail panel
 */
export interface ExtendedCustomization extends Omit<IconCustomization, 'lively' | 'animated'> {
  /** Motion type for the animation */
  lively?: MotionType;
  /** Whether animation is enabled */
  animated?: boolean;
}

export interface DetailPanelProps {
  /** The selected icon to display */
  icon: IconMetadata | null;
  /** Current customization settings */
  customization: ExtendedCustomization;
  /** Callback when customization changes */
  onCustomize: (update: Partial<ExtendedCustomization>) => void;
  /** Callback to insert the icon at cursor */
  onInsert: () => void;
  /** Callback to copy the code */
  onCopy: () => void;
  /** Callback to close the panel */
  onClose: () => void;
  /** Whether running in VSCode context */
  isVSCode?: boolean;
}

/**
 * Slide-in panel showing icon details and customization options
 */
export function DetailPanel({
  icon,
  customization,
  onCustomize,
  onInsert,
  onCopy,
  onClose,
  isVSCode = false,
}: DetailPanelProps) {
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  if (!icon) {
    return null;
  }

  return (
    <div
      className={`detail-panel ${icon ? 'open' : ''}`}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-label={`Details for ${icon.displayName} icon`}
      aria-modal="true"
    >
      {/* Header */}
      <div className="detail-header">
        <div className="detail-header-info">
          <h2 className="detail-title">{icon.displayName}</h2>
          <span className="detail-category">{icon.category}</span>
        </div>
        <button
          className="detail-close"
          onClick={onClose}
          aria-label="Close panel"
          type="button"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 8.707l3.646 3.647.708-.708L8.707 8l3.647-3.646-.708-.708L8 7.293 4.354 3.646l-.708.708L7.293 8l-3.647 3.646.708.708L8 8.707z" />
          </svg>
        </button>
      </div>

      {/* Scrollable content */}
      <div className="detail-content">
        {/* Large animated preview */}
        <div
          className="detail-preview"
          style={{
            color: customization.color || 'currentColor',
          }}
        >
          <TrustedSvgRenderer
            svgContent={icon.svgContent}
            size={customization.size || 64}
          />
        </div>

        {/* Icon info */}
        <div className="detail-section">
          <span className="detail-section-title">Categories</span>
          <div className="detail-tags">
            <span className="badge">{icon.category}</span>
          </div>
        </div>

        {/* Tags */}
        {icon.tags.length > 0 && (
          <div className="detail-section">
            <span className="detail-section-title">Tags</span>
            <div className="detail-tags">
              {icon.tags.map((tag) => (
                <span key={tag} className="badge">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Customization controls */}
        <div className="detail-section">
          <span className="detail-section-title">Customize</span>
          <CustomizationPanel
            customization={customization}
            onChange={onCustomize}
            iconTriggerModes={icon.triggerModes}
          />
        </div>

        {/* Code preview */}
        <div className="detail-section">
          <span className="detail-section-title">Code</span>
          <CodePreview
            iconName={icon.name}
            customization={customization}
          />
        </div>
      </div>

      {/* Action buttons */}
      <div className="detail-actions">
        {isVSCode && (
          <button
            className="action-button primary"
            onClick={onInsert}
            type="button"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
            Insert at Cursor
          </button>
        )}
        <button
          className="action-button secondary"
          onClick={onCopy}
          type="button"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
          Copy Code
        </button>
      </div>
    </div>
  );
}
