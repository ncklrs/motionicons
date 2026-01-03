import { useCallback } from 'react';
import type { TriggerMode, MotionType } from '../types';
import type { ExtendedCustomization } from './DetailPanel';
import './CustomizationPanel.css';

/**
 * Available motion types for icons
 */
const MOTION_TYPES = [
  { value: 'scale', label: 'Scale', description: 'Grow on hover' },
  { value: 'rotate', label: 'Rotate', description: 'Spin on hover' },
  { value: 'translate', label: 'Translate', description: 'Slide on hover' },
  { value: 'shake', label: 'Shake', description: 'Wobble effect' },
  { value: 'pulse', label: 'Pulse', description: 'Heartbeat effect' },
  { value: 'bounce', label: 'Bounce', description: 'Bouncy spring' },
  { value: 'draw', label: 'Draw', description: 'Fade reveal' },
  { value: 'spin', label: 'Spin', description: 'Continuous rotation' },
  { value: 'none', label: 'None', description: 'No animation' },
] as const;

/**
 * Available trigger modes for animations
 */
const TRIGGER_MODES = [
  { value: 'hover', label: 'Hover', description: 'On mouse hover' },
  { value: 'loop', label: 'Loop', description: 'Continuous animation' },
  { value: 'mount', label: 'Mount', description: 'On component mount' },
  { value: 'inView', label: 'In View', description: 'When scrolled into view' },
] as const;

export interface CustomizationPanelProps {
  /** Current customization settings */
  customization: ExtendedCustomization;
  /** Callback when settings change */
  onChange: (update: Partial<ExtendedCustomization>) => void;
  /** Available trigger modes for this icon */
  iconTriggerModes?: TriggerMode[];
}

/**
 * Panel with controls for customizing icon output
 */
export function CustomizationPanel({
  customization,
  onChange,
  // iconTriggerModes is available for future use when icons have specific trigger modes
  iconTriggerModes: _iconTriggerModes = ['hover', 'click', 'loop', 'autoplay', 'none'],
}: CustomizationPanelProps) {
  const handleSizeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(e.target.value, 10);
      if (!isNaN(value)) {
        onChange({ size: value });
      }
    },
    [onChange]
  );

  const handleStrokeWidthChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseFloat(e.target.value);
      if (!isNaN(value)) {
        onChange({ strokeWidth: value });
      }
    },
    [onChange]
  );

  const handleMotionTypeChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      onChange({ lively: e.target.value as MotionType });
    },
    [onChange]
  );

  const handleTriggerChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      onChange({ trigger: e.target.value as TriggerMode });
    },
    [onChange]
  );

  const handleAnimatedChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange({ animated: e.target.checked });
    },
    [onChange]
  );

  return (
    <div className="customization-panel">
      {/* Size slider */}
      <div className="control-row">
        <label className="control-label" htmlFor="size-slider">
          Size
        </label>
        <div className="control-slider-group">
          <input
            id="size-slider"
            type="range"
            className="control-slider"
            min={16}
            max={64}
            step={1}
            value={customization.size || 24}
            onChange={handleSizeChange}
            aria-valuemin={16}
            aria-valuemax={64}
            aria-valuenow={customization.size || 24}
          />
          <span className="control-value">{customization.size || 24}px</span>
        </div>
      </div>

      {/* Stroke width slider */}
      <div className="control-row">
        <label className="control-label" htmlFor="stroke-slider">
          Stroke
        </label>
        <div className="control-slider-group">
          <input
            id="stroke-slider"
            type="range"
            className="control-slider"
            min={1}
            max={4}
            step={0.5}
            value={customization.strokeWidth || 2}
            onChange={handleStrokeWidthChange}
            aria-valuemin={1}
            aria-valuemax={4}
            aria-valuenow={customization.strokeWidth || 2}
          />
          <span className="control-value">{customization.strokeWidth || 2}</span>
        </div>
      </div>

      {/* Motion type dropdown */}
      <div className="control-row">
        <label className="control-label" htmlFor="motion-type-select">
          Motion
        </label>
        <select
          id="motion-type-select"
          className="control-select"
          value={customization.lively || 'scale'}
          onChange={handleMotionTypeChange}
          aria-describedby="motion-type-hint"
        >
          {MOTION_TYPES.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      </div>
      <span id="motion-type-hint" className="control-hint">
        {MOTION_TYPES.find((t) => t.value === (customization.lively || 'scale'))?.description}
      </span>

      {/* Trigger dropdown */}
      <div className="control-row">
        <label className="control-label" htmlFor="trigger-select">
          Trigger
        </label>
        <select
          id="trigger-select"
          className="control-select"
          value={customization.trigger || 'hover'}
          onChange={handleTriggerChange}
        >
          {TRIGGER_MODES.map((mode) => (
            <option key={mode.value} value={mode.value}>
              {mode.label}
            </option>
          ))}
        </select>
      </div>

      {/* Animated toggle */}
      <div className="control-row">
        <label className="control-label" htmlFor="animated-toggle">
          Animated
        </label>
        <div className="control-toggle-group">
          <label className="toggle-switch">
            <input
              id="animated-toggle"
              type="checkbox"
              checked={customization.animated !== false}
              onChange={handleAnimatedChange}
              aria-describedby="animated-hint"
            />
            <span className="toggle-slider"></span>
          </label>
          <span className="toggle-label">
            {customization.animated !== false ? 'On' : 'Off'}
          </span>
        </div>
      </div>
      <span id="animated-hint" className="control-hint">
        {customization.animated !== false
          ? 'Animation is enabled'
          : 'Animation is disabled'}
      </span>
    </div>
  );
}
