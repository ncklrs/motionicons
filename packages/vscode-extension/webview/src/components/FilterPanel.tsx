import React, { memo, useCallback, useMemo } from 'react';

/**
 * Motion types available for icons
 */
export const MOTION_TYPES = [
  'all',
  'scale',
  'rotate',
  'translate',
  'shake',
  'pulse',
  'bounce',
  'draw',
  'spin',
  'none',
] as const;

export type MotionType = (typeof MOTION_TYPES)[number];

/**
 * Trigger modes for animations
 */
export const TRIGGER_MODES = ['all', 'hover', 'loop', 'mount', 'inView'] as const;

export type TriggerMode = (typeof TRIGGER_MODES)[number];

/**
 * Filter state structure
 */
export interface FilterState {
  /** Selected categories (empty means all) */
  categories: string[];
  /** Selected motion type */
  lively: MotionType;
  /** Selected trigger mode */
  trigger: TriggerMode;
}

export interface FilterPanelProps {
  /** Current filter state */
  filters: FilterState;
  /** Filter change handler */
  onChange: (filters: FilterState) => void;
  /** Available categories from data */
  categories: string[];
  /** Whether the panel is expanded */
  isExpanded?: boolean;
  /** Toggle expansion handler */
  onToggleExpanded?: () => void;
}

/**
 * Collapsible filter panel component
 * Features: category pills, motion type dropdown, trigger dropdown
 */
export const FilterPanel = memo(function FilterPanel({
  filters,
  onChange,
  categories,
  isExpanded = true,
  onToggleExpanded,
}: FilterPanelProps) {
  // Check if any filters are active
  const hasActiveFilters = useMemo(() => {
    return (
      filters.categories.length > 0 ||
      filters.lively !== 'all' ||
      filters.trigger !== 'all'
    );
  }, [filters]);

  // Count active filters
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.categories.length > 0) count += filters.categories.length;
    if (filters.lively !== 'all') count += 1;
    if (filters.trigger !== 'all') count += 1;
    return count;
  }, [filters]);

  // Toggle category selection
  const handleCategoryToggle = useCallback(
    (category: string) => {
      const newCategories = filters.categories.includes(category)
        ? filters.categories.filter((c) => c !== category)
        : [...filters.categories, category];

      onChange({
        ...filters,
        categories: newCategories,
      });
    },
    [filters, onChange]
  );

  // Handle motion type change
  const handleMotionTypeChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      onChange({
        ...filters,
        lively: e.target.value as MotionType,
      });
    },
    [filters, onChange]
  );

  // Handle trigger change
  const handleTriggerChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      onChange({
        ...filters,
        trigger: e.target.value as TriggerMode,
      });
    },
    [filters, onChange]
  );

  // Clear all filters
  const handleClearFilters = useCallback(() => {
    onChange({
      categories: [],
      lively: 'all',
      trigger: 'all',
    });
  }, [onChange]);

  // Format category name for display
  const formatCategoryName = (category: string): string => {
    return category
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className="filter-panel-wrapper">
      {/* Panel toggle header */}
      <button
        className="filter-panel-toggle"
        onClick={onToggleExpanded}
        aria-expanded={isExpanded}
        aria-controls="filter-panel-content"
      >
        <span className="filter-panel-toggle-label">
          Filters
          {activeFilterCount > 0 && (
            <span className="filter-panel-badge" aria-label={`${activeFilterCount} active filters`}>
              {activeFilterCount}
            </span>
          )}
        </span>
        <svg
          className={`filter-panel-toggle-icon ${isExpanded ? 'expanded' : ''}`}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {/* Collapsible content */}
      <div
        id="filter-panel-content"
        className={`filter-panel-content ${isExpanded ? 'expanded' : 'collapsed'}`}
        aria-hidden={!isExpanded}
      >
        {/* Categories section */}
        <div className="filter-section">
          <span className="filter-section-label">Categories</span>
          <div className="filter-pills" role="group" aria-label="Filter by category">
            {categories.map((category) => {
              const isActive = filters.categories.includes(category);
              return (
                <button
                  key={category}
                  className={`filter-pill ${isActive ? 'active' : ''}`}
                  onClick={() => handleCategoryToggle(category)}
                  aria-pressed={isActive}
                >
                  {formatCategoryName(category)}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dropdowns row */}
        <div className="filter-dropdowns">
          {/* Motion type dropdown */}
          <div className="filter-dropdown-group">
            <label className="filter-dropdown-label" htmlFor="motion-type-select">
              Motion Type
            </label>
            <select
              id="motion-type-select"
              className="filter-dropdown"
              value={filters.lively}
              onChange={handleMotionTypeChange}
            >
              {MOTION_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Trigger dropdown */}
          <div className="filter-dropdown-group">
            <label className="filter-dropdown-label" htmlFor="trigger-select">
              Trigger
            </label>
            <select
              id="trigger-select"
              className="filter-dropdown"
              value={filters.trigger}
              onChange={handleTriggerChange}
            >
              {TRIGGER_MODES.map((mode) => (
                <option key={mode} value={mode}>
                  {mode === 'all' ? 'All Triggers' : mode.charAt(0).toUpperCase() + mode.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Clear filters button */}
        {hasActiveFilters && (
          <button
            className="filter-clear-button"
            onClick={handleClearFilters}
            aria-label="Clear all filters"
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
              aria-hidden="true"
            >
              <path d="M18 6L6 18" />
              <path d="M6 6l12 12" />
            </svg>
            Clear filters
          </button>
        )}
      </div>
    </div>
  );
});

export default FilterPanel;
