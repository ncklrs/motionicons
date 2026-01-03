/**
 * TypeScript interfaces for the MotionIcon picker webview
 * These types match the extension types for consistent communication
 */

/**
 * Icon trigger mode - how the animation is activated
 */
export type TriggerMode = 'hover' | 'click' | 'loop' | 'autoplay' | 'mount' | 'inView' | 'none';

/**
 * Motion type for animations
 */
export type MotionType = 'scale' | 'rotate' | 'translate' | 'shake' | 'pulse' | 'bounce' | 'draw' | 'spin' | 'none';

/**
 * Icon category for filtering
 */
export type IconCategory =
  | 'actions'
  | 'arrows'
  | 'communication'
  | 'devices'
  | 'files'
  | 'media'
  | 'navigation'
  | 'status'
  | 'ui'
  | 'misc'
  | 'health'
  | 'charts';

/**
 * SVG element definition from icon data
 */
export interface SVGElementDef {
  type: string;
  attributes: Record<string, string | number>;
}

/**
 * Icon data from icons.json file
 * This is the format icons are stored in
 */
export interface IconData {
  /** Unique icon identifier (kebab-case, e.g., 'arrow-right') */
  id: string;
  /** Display name for the UI (PascalCase, e.g., 'ArrowRight') */
  name: string;
  /** SVG elements that make up the icon */
  elements: SVGElementDef[];
  /** SVG viewBox attribute */
  viewBox: string;
  /** Categories for filtering */
  categories: string[];
  /** Search tags for improved discoverability */
  tags: string[];
  /** Default motion type for this icon */
  defaultMotionType: string;
}

/**
 * Icon metadata for display and filtering
 * Used by legacy components that expect svgContent
 */
export interface IconMetadata {
  /** Unique icon identifier (e.g., 'arrow-up', 'check-circle') */
  name: string;
  /** Display name for the UI */
  displayName: string;
  /** Icon category for filtering */
  category: IconCategory;
  /** Search tags for improved discoverability */
  tags: string[];
  /** Available trigger modes for this icon */
  triggerModes: TriggerMode[];
  /** SVG preview content for rendering */
  svgContent: string;
}

/**
 * Customization options for an icon
 */
export interface IconCustomization {
  /** Size in pixels */
  size?: number;
  /** Stroke width */
  strokeWidth?: number;
  /** Color (CSS color value) */
  color?: string;
  /** Animation trigger mode */
  trigger?: TriggerMode;
  /** Motion type for animation */
  lively?: MotionType;
  /** Whether animation is enabled */
  animated?: boolean;
  /** Additional className */
  className?: string;
}

/**
 * Filter state for the icon grid (original format)
 */
export interface FilterState {
  /** Active category filter */
  category: IconCategory | 'all';
  /** Active trigger mode filter */
  triggerMode: TriggerMode | 'all';
  /** Sort order */
  sortBy: 'name' | 'category' | 'recent';
}

/**
 * Extended filter state for FilterPanel component
 */
export interface AppFilterState {
  /** Selected categories (empty means all) */
  categories: string[];
  /** Selected motion type */
  lively: MotionType | 'all';
  /** Selected trigger mode */
  trigger: TriggerMode | 'all';
}

/**
 * Selected icon state including customization
 */
export interface SelectedIconState {
  /** The selected icon metadata */
  icon: IconMetadata;
  /** Current customization options */
  customization: IconCustomization;
}

/**
 * Webview state for persistence
 */
export interface WebviewState {
  /** Current search query */
  searchQuery: string;
  /** Current filter state */
  filters: FilterState;
  /** Selected icon (if any) */
  selectedIcon: SelectedIconState | null;
  /** Recently used icons (for quick access) */
  recentIcons: string[];
  /** Whether the filter panel is expanded */
  filterPanelExpanded: boolean;
}

/**
 * Message types from webview to extension
 */
export type WebviewToExtensionMessage =
  | { type: 'ready' }
  | { type: 'requestIcons' }
  | { type: 'insertIcon'; icon: string; customization: IconCustomization }
  | { type: 'copyImport'; icon: string }
  | { type: 'copyComponent'; icon: string; customization: IconCustomization }
  | { type: 'openDocs'; icon: string }
  | { type: 'updateState'; state: Partial<WebviewState> };

/**
 * Message types from extension to webview
 */
export type ExtensionToWebviewMessage =
  | { type: 'iconsLoaded'; icons: IconMetadata[] }
  | { type: 'themeChanged'; theme: 'light' | 'dark' | 'high-contrast' }
  | { type: 'stateRestored'; state: WebviewState }
  | { type: 'error'; message: string };

/**
 * VSCode API interface for webview communication
 */
export interface VSCodeAPI {
  postMessage(message: WebviewToExtensionMessage): void;
  getState(): WebviewState | undefined;
  setState(state: WebviewState): void;
}

/**
 * Declare the global acquireVsCodeApi function
 */
declare global {
  function acquireVsCodeApi(): VSCodeAPI;
}
