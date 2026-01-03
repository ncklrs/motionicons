import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { useVSCode } from './hooks/useVSCode';
import { useFavorites } from './hooks/useFavorites';
import { useSearch } from './hooks/useSearch';
import { SearchBar } from './components/SearchBar';
import { FilterPanel, type FilterState as FilterPanelState } from './components/FilterPanel';
import { IconGrid, type IconGridRef } from './components/IconGrid';
import { DetailPanel, type ExtendedCustomization } from './components/DetailPanel';
import { FavoritesBar } from './components/FavoritesBar';
import type { IconData } from './components/IconCard';
import type { IconMetadata, IconCustomization, TriggerMode, MotionType } from './types';
// Import icons.json for standalone development mode
import iconsData from '../../src/data/icons.json';

/**
 * Default customization values
 */
const DEFAULT_CUSTOMIZATION: ExtendedCustomization = {
  size: 24,
  strokeWidth: 2,
  color: 'currentColor',
  trigger: 'hover',
  lively: 'scale',
  animated: true,
};

/**
 * Default filter state
 */
const DEFAULT_FILTERS: FilterPanelState = {
  categories: [],
  lively: 'all',
  trigger: 'all',
};

/**
 * Convert IconData (from icons.json) to IconMetadata (for DetailPanel/FavoritesBar)
 */
function iconDataToMetadata(icon: IconData): IconMetadata {
  // Generate SVG content from elements
  const svgContent = generateSvgContent(icon);

  return {
    name: icon.id,
    displayName: icon.name,
    category: icon.categories[0] as IconMetadata['category'] || 'misc',
    tags: icon.tags,
    triggerModes: ['hover', 'click', 'loop', 'mount', 'none'] as TriggerMode[],
    svgContent,
  };
}

/**
 * Generate SVG content string from icon elements
 */
function generateSvgContent(icon: IconData): string {
  const elementsHtml = icon.elements
    .map((element) => {
      const attrs = Object.entries(element.attributes)
        .map(([key, value]) => `${key}="${value}"`)
        .join(' ');
      return `<${element.type} ${attrs} />`;
    })
    .join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="${icon.viewBox}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${elementsHtml}</svg>`;
}

/**
 * Main MotionIcon Picker Application
 *
 * Security Note: This webview uses dangerouslySetInnerHTML to render SVG icons.
 * The SVG content is sourced exclusively from the extension's bundled icon library,
 * which is a trusted source. User-provided content is never rendered this way.
 */
function App() {
  // VSCode hook for communication with extension
  const {
    icons: vscodeIcons,
    state: vscodeState,
    error,
    isVSCode,
    setState: setVSCodeState,
    postMessage,
    addToRecent,
    clearError,
  } = useVSCode();

  // Favorites hook
  const { favorites, toggleFavorite } = useFavorites();

  // Grid ref for programmatic scrolling
  const gridRef = useRef<IconGridRef>(null);

  // Local state
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterPanelState>(DEFAULT_FILTERS);
  const [filterPanelExpanded, setFilterPanelExpanded] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState<IconData | null>(null);
  const [customization, setCustomization] = useState<ExtendedCustomization>(DEFAULT_CUSTOMIZATION);

  // Use icons from VSCode or fallback to imported icons.json for development
  const icons: IconData[] = useMemo(() => {
    if (isVSCode && vscodeIcons.length > 0) {
      // Convert IconMetadata to IconData if needed
      // This handles the case where extension sends IconMetadata format
      return vscodeIcons.map((icon: any) => {
        if ('elements' in icon) {
          return icon as IconData;
        }
        // Convert IconMetadata back to IconData (shouldn't happen normally)
        return {
          id: icon.name,
          name: icon.displayName,
          elements: [],
          viewBox: '0 0 24 24',
          categories: [icon.category],
          tags: icon.tags,
          defaultMotionType: 'scale',
        } as IconData;
      });
    }
    // Standalone development mode - use imported icons.json
    return iconsData as unknown as IconData[];
  }, [isVSCode, vscodeIcons]);

  // Extract unique categories from icons
  const availableCategories = useMemo(() => {
    const categorySet = new Set<string>();
    icons.forEach((icon) => {
      icon.categories.forEach((cat) => categorySet.add(cat));
    });
    return Array.from(categorySet).sort();
  }, [icons]);

  // Use the search hook for filtering
  const { filteredIcons, isFiltering, matchCount, totalCount } = useSearch({
    icons,
    query: searchQuery,
    filters,
  });

  // Convert selected IconData to IconMetadata for DetailPanel
  const selectedIconMetadata = useMemo(() => {
    if (!selectedIcon) return null;
    return iconDataToMetadata(selectedIcon);
  }, [selectedIcon]);

  // Convert icons to IconMetadata for FavoritesBar
  const iconsAsMetadata = useMemo(() => {
    return icons.map(iconDataToMetadata);
  }, [icons]);

  // Sync with VSCode state when available
  useEffect(() => {
    if (isVSCode && vscodeState) {
      setSearchQuery(vscodeState.searchQuery || '');
      setFilterPanelExpanded(vscodeState.filterPanelExpanded || false);
    }
  }, [isVSCode, vscodeState]);

  // Handle search change
  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value);
    if (isVSCode) {
      setVSCodeState({ searchQuery: value });
    }
  }, [isVSCode, setVSCodeState]);

  // Handle filter change
  const handleFilterChange = useCallback((newFilters: FilterPanelState) => {
    setFilters(newFilters);
  }, []);

  // Toggle filter panel
  const handleToggleFilterPanel = useCallback(() => {
    setFilterPanelExpanded((prev) => {
      const newValue = !prev;
      if (isVSCode) {
        setVSCodeState({ filterPanelExpanded: newValue });
      }
      return newValue;
    });
  }, [isVSCode, setVSCodeState]);

  // Handle icon selection from grid
  const handleIconSelect = useCallback((icon: IconData) => {
    setSelectedIcon(icon);
    // Set default customization based on icon
    setCustomization({
      ...DEFAULT_CUSTOMIZATION,
      lively: (icon.defaultMotionType as MotionType) || 'scale',
    });
    addToRecent(icon.id);
  }, [addToRecent]);

  // Handle icon selection from favorites bar
  const handleFavoriteSelect = useCallback((iconMetadata: IconMetadata) => {
    // Find the full IconData for this icon
    const icon = icons.find((i) => i.id === iconMetadata.name);
    if (icon) {
      handleIconSelect(icon);
      // Scroll to the icon in the grid
      gridRef.current?.scrollToIcon(icon.id);
    }
  }, [icons, handleIconSelect]);

  // Handle customization change
  const handleCustomizationChange = useCallback((update: Partial<ExtendedCustomization>) => {
    setCustomization((prev) => ({ ...prev, ...update }));
  }, []);

  // Close detail panel
  const handleCloseDetail = useCallback(() => {
    setSelectedIcon(null);
  }, []);

  // Insert icon at cursor (VSCode only)
  const handleInsertIcon = useCallback(() => {
    if (selectedIcon) {
      const iconCustomization: IconCustomization = {
        size: customization.size,
        strokeWidth: customization.strokeWidth,
        color: customization.color,
        trigger: customization.trigger,
        lively: customization.lively as MotionType,
        animated: customization.animated,
      };

      postMessage({
        type: 'insertIcon',
        icon: selectedIcon.id,
        customization: iconCustomization,
      });
    }
  }, [selectedIcon, customization, postMessage]);

  // Copy code to clipboard
  const handleCopyCode = useCallback(async () => {
    if (!selectedIcon) return;

    const componentName = selectedIcon.name;
    const props: string[] = [];

    if (customization.size && customization.size !== 24) {
      props.push(`size={${customization.size}}`);
    }
    if (customization.strokeWidth && customization.strokeWidth !== 2) {
      props.push(`strokeWidth={${customization.strokeWidth}}`);
    }
    if (customization.lively && customization.lively !== 'scale') {
      props.push(`lively="${customization.lively}"`);
    }
    if (customization.trigger && customization.trigger !== 'hover') {
      props.push(`trigger="${customization.trigger}"`);
    }
    if (customization.animated === false) {
      props.push('animated={false}');
    }

    const propsStr = props.length > 0 ? ` ${props.join(' ')}` : '';
    const code = `import { ${componentName} } from 'motionicon'\n\n<${componentName}${propsStr} />`;

    try {
      await navigator.clipboard.writeText(code);
      // Could show a toast here
    } catch (err) {
      console.error('Failed to copy code:', err);
      // Fallback: send to extension
      postMessage({
        type: 'copyComponent',
        icon: selectedIcon.id,
        customization: {
          size: customization.size,
          strokeWidth: customization.strokeWidth,
          trigger: customization.trigger,
          lively: customization.lively as MotionType,
          animated: customization.animated,
        },
      });
    }
  }, [selectedIcon, customization, postMessage]);

  // Handle toggle favorite
  const handleToggleFavorite = useCallback((iconName: string) => {
    toggleFavorite(iconName);
  }, [toggleFavorite]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Escape to close detail panel
      if (e.key === 'Escape' && selectedIcon) {
        e.preventDefault();
        handleCloseDetail();
      }
      // F to toggle favorite when icon is selected
      if (e.key === 'f' && selectedIcon && !e.metaKey && !e.ctrlKey) {
        const target = e.target as HTMLElement;
        if (target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA') {
          e.preventDefault();
          handleToggleFavorite(selectedIcon.id);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIcon, handleCloseDetail, handleToggleFavorite]);

  return (
    <div className={`app-container ${selectedIcon ? 'has-detail-panel' : ''}`}>
      {/* Error banner */}
      {error && (
        <div className="error-banner" role="alert">
          <span>{error}</span>
          <button onClick={clearError} aria-label="Dismiss error">
            Dismiss
          </button>
        </div>
      )}

      {/* Header with search and filters */}
      <header className="app-header">
        <SearchBar
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder={`Search ${totalCount} icons...`}
        />
        <FilterPanel
          filters={filters}
          onChange={handleFilterChange}
          categories={availableCategories}
          isExpanded={filterPanelExpanded}
          onToggleExpanded={handleToggleFilterPanel}
        />
      </header>

      {/* Favorites bar */}
      <FavoritesBar
        favorites={favorites}
        icons={iconsAsMetadata}
        onSelect={handleFavoriteSelect}
      />

      {/* Main content area */}
      <main className="app-main">
        {/* Status bar showing filter results */}
        {isFiltering && (
          <div className="status-bar" role="status" aria-live="polite">
            Showing {matchCount} of {totalCount} icons
          </div>
        )}

        {/* Icon grid */}
        <IconGrid
          ref={gridRef}
          icons={filteredIcons}
          selectedId={selectedIcon?.id || null}
          onSelect={handleIconSelect}
          animationClass={`animate-${customization.lively || 'scale'}`}
        />
      </main>

      {/* Detail panel (slides in when icon selected) */}
      {selectedIconMetadata && (
        <DetailPanel
          icon={selectedIconMetadata}
          customization={customization}
          onCustomize={handleCustomizationChange}
          onInsert={handleInsertIcon}
          onCopy={handleCopyCode}
          onClose={handleCloseDetail}
          isVSCode={isVSCode}
        />
      )}
    </div>
  );
}

export default App;
