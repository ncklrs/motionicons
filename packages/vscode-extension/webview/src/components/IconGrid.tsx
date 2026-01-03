import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { FixedSizeGrid, GridChildComponentProps } from 'react-window';
import { IconCard, type IconData } from './IconCard';

/**
 * Minimum column widths for responsive grid
 */
const MIN_COLUMN_WIDTH = 80;
const MIN_COLUMNS = 2;
const MAX_COLUMNS = 6;
const ROW_HEIGHT = 100;
const GRID_GAP = 8;

export interface IconGridProps {
  /** Array of icons to display */
  icons: IconData[];
  /** Currently selected icon ID */
  selectedId: string | null;
  /** Selection handler */
  onSelect: (icon: IconData) => void;
  /** Animation class to apply on hover preview */
  animationClass?: string;
}

export interface IconGridRef {
  /** Scroll to a specific icon by ID */
  scrollToIcon: (iconId: string) => void;
  /** Focus the grid for keyboard navigation */
  focus: () => void;
}

/**
 * Item data passed to cell renderer
 */
interface CellData {
  icons: IconData[];
  columnCount: number;
  selectedId: string | null;
  onSelect: (icon: IconData) => void;
  animationClass?: string;
  focusedIndex: number;
  onKeyDown: (e: React.KeyboardEvent, index: number) => void;
}

const CellRenderer = memo(function CellRenderer({
  columnIndex,
  rowIndex,
  style,
  data,
}: GridChildComponentProps<CellData>) {
  const { icons, columnCount, selectedId, onSelect, animationClass, focusedIndex, onKeyDown } =
    data;

  const index = rowIndex * columnCount + columnIndex;

  // Return empty cell if index is out of bounds
  if (index >= icons.length) {
    return <div style={style} />;
  }

  const icon = icons[index];
  const isSelected = icon.id === selectedId;
  const isFocused = index === focusedIndex;

  const handleClick = () => onSelect(icon);
  const handleKeyDown = (e: React.KeyboardEvent) => onKeyDown(e, index);

  // Adjust style to account for gap
  const adjustedStyle: React.CSSProperties = {
    ...style,
    left: Number(style.left) + GRID_GAP,
    top: Number(style.top) + GRID_GAP,
    width: Number(style.width) - GRID_GAP,
    height: Number(style.height) - GRID_GAP,
  };

  return (
    <IconCard
      icon={icon}
      isSelected={isSelected}
      onClick={handleClick}
      animationClass={animationClass}
      style={adjustedStyle}
      tabIndex={isFocused ? 0 : -1}
      onKeyDown={handleKeyDown}
    />
  );
});

/**
 * Virtualized icon grid using react-window
 * Supports responsive columns and keyboard navigation
 */
export const IconGrid = forwardRef<IconGridRef, IconGridProps>(function IconGrid(
  { icons, selectedId, onSelect, animationClass },
  ref
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<FixedSizeGrid>(null);
  const [containerSize, setContainerSize] = useState({ width: 400, height: 400 });
  const [focusedIndex, setFocusedIndex] = useState(0);

  // Calculate responsive column count based on container width
  const columnCount = useMemo(() => {
    const availableWidth = containerSize.width - GRID_GAP * 2;
    const calculatedColumns = Math.floor(availableWidth / MIN_COLUMN_WIDTH);
    return Math.max(MIN_COLUMNS, Math.min(MAX_COLUMNS, calculatedColumns));
  }, [containerSize.width]);

  // Calculate column width based on container and column count
  const columnWidth = useMemo(() => {
    const availableWidth = containerSize.width - GRID_GAP;
    return Math.floor(availableWidth / columnCount);
  }, [containerSize.width, columnCount]);

  // Calculate row count
  const rowCount = useMemo(() => {
    return Math.ceil(icons.length / columnCount);
  }, [icons.length, columnCount]);

  // Handle container resize
  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        setContainerSize({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });

    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // Reset focused index when icons change
  useEffect(() => {
    setFocusedIndex(0);
  }, [icons]);

  // Scroll to selected icon when selection changes externally
  useEffect(() => {
    if (selectedId && gridRef.current) {
      const index = icons.findIndex((icon) => icon.id === selectedId);
      if (index >= 0) {
        const row = Math.floor(index / columnCount);
        const col = index % columnCount;
        gridRef.current.scrollToItem({ rowIndex: row, columnIndex: col, align: 'smart' });
      }
    }
  }, [selectedId, icons, columnCount]);

  // Keyboard navigation handler
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, currentIndex: number) => {
      let newIndex = currentIndex;
      let handled = false;

      switch (e.key) {
        case 'ArrowRight':
          if (currentIndex < icons.length - 1) {
            newIndex = currentIndex + 1;
            handled = true;
          }
          break;
        case 'ArrowLeft':
          if (currentIndex > 0) {
            newIndex = currentIndex - 1;
            handled = true;
          }
          break;
        case 'ArrowDown':
          if (currentIndex + columnCount < icons.length) {
            newIndex = currentIndex + columnCount;
            handled = true;
          }
          break;
        case 'ArrowUp':
          if (currentIndex - columnCount >= 0) {
            newIndex = currentIndex - columnCount;
            handled = true;
          }
          break;
        case 'Home':
          newIndex = 0;
          handled = true;
          break;
        case 'End':
          newIndex = icons.length - 1;
          handled = true;
          break;
      }

      if (handled) {
        e.preventDefault();
        setFocusedIndex(newIndex);

        // Scroll to the new focused item
        if (gridRef.current) {
          const row = Math.floor(newIndex / columnCount);
          const col = newIndex % columnCount;
          gridRef.current.scrollToItem({ rowIndex: row, columnIndex: col, align: 'smart' });
        }

        // Focus the new item
        requestAnimationFrame(() => {
          const focusedElement = containerRef.current?.querySelector(
            `[tabindex="0"]`
          ) as HTMLElement;
          focusedElement?.focus();
        });
      }
    },
    [icons.length, columnCount]
  );

  // Expose imperative methods via ref
  useImperativeHandle(
    ref,
    () => ({
      scrollToIcon: (iconId: string) => {
        const index = icons.findIndex((icon) => icon.id === iconId);
        if (index >= 0 && gridRef.current) {
          const row = Math.floor(index / columnCount);
          const col = index % columnCount;
          gridRef.current.scrollToItem({ rowIndex: row, columnIndex: col, align: 'center' });
          setFocusedIndex(index);
        }
      },
      focus: () => {
        const focusedElement = containerRef.current?.querySelector(
          `[tabindex="0"]`
        ) as HTMLElement;
        focusedElement?.focus();
      },
    }),
    [icons, columnCount]
  );

  // Item data for cell renderer
  const itemData = useMemo(
    () => ({
      icons,
      columnCount,
      selectedId,
      onSelect,
      animationClass,
      focusedIndex,
      onKeyDown: handleKeyDown,
    }),
    [icons, columnCount, selectedId, onSelect, animationClass, focusedIndex, handleKeyDown]
  );

  // Empty state
  if (icons.length === 0) {
    return (
      <div className="icon-grid-empty" role="status" aria-live="polite">
        <svg
          className="icon-grid-empty-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
        <p className="icon-grid-empty-title">No icons found</p>
        <p className="icon-grid-empty-description">
          Try adjusting your search or filters
        </p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="icon-grid-container"
      role="grid"
      aria-label="Icon grid"
      aria-rowcount={rowCount}
      aria-colcount={columnCount}
    >
      <FixedSizeGrid
        ref={gridRef}
        className="icon-grid-virtual"
        columnCount={columnCount}
        columnWidth={columnWidth}
        height={containerSize.height}
        rowCount={rowCount}
        rowHeight={ROW_HEIGHT}
        width={containerSize.width}
        itemData={itemData}
        overscanRowCount={2}
      >
        {CellRenderer}
      </FixedSizeGrid>
    </div>
  );
});

export default IconGrid;
