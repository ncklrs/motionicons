/**
 * Represents attributes on an SVG element
 */
export interface SVGAttributes {
  [key: string]: string | number | undefined;
}

/**
 * Represents a single SVG element within an icon
 */
export interface SVGElement {
  type: string;
  attributes: SVGAttributes;
  children?: SVGElement[];
}

/**
 * Motion type options for icon animations
 */
export type MotionType =
  | 'static'
  | 'draw'
  | 'spin'
  | 'pulse'
  | 'bounce'
  | 'shake'
  | 'float'
  | 'morph';

/**
 * Represents an extracted icon from the MotionIcons library
 */
export interface ExtractedIcon {
  id: string;
  name: string;
  elements: SVGElement[];
  categories: string[];
  tags: string[];
  defaultMotionType: MotionType;
}

/**
 * Icon data sent to the webview
 */
export interface IconData {
  icons: ExtractedIcon[];
  categories: string[];
  version: string;
}

/**
 * Animation trigger modes
 */
export type TriggerType = 'hover' | 'loop' | 'mount' | 'inView';

/**
 * Code generation options for inserting icons
 */
export interface CodeGenerationOptions {
  iconId?: string;
  iconName: string;
  /** Default motion type for the icon (from icon metadata) */
  defaultMotionType?: MotionType;
  /** Motion type (alias for lively) */
  motionType?: MotionType;
  lively?: MotionType;
  size?: number;
  color?: string;
  strokeWidth?: number;
  /** Animation trigger mode */
  trigger?: TriggerType;
  /** Whether icon should be animated (undefined = use default true) */
  animated?: boolean;
  includeImport?: boolean;
  importStyle?: 'named' | 'default' | 'namespace';
}

/**
 * Message types from webview to extension
 */
export type WebviewMessage =
  | InsertIconMessage
  | AddFavoriteMessage
  | RemoveFavoriteMessage
  | GetFavoritesMessage
  | CopyCodeMessage
  | ReadyMessage;

export interface InsertIconMessage {
  type: 'insertIcon';
  payload: CodeGenerationOptions;
}

export interface AddFavoriteMessage {
  type: 'addFavorite';
  payload: {
    iconId: string;
  };
}

export interface RemoveFavoriteMessage {
  type: 'removeFavorite';
  payload: {
    iconId: string;
  };
}

export interface GetFavoritesMessage {
  type: 'getFavorites';
}

export interface CopyCodeMessage {
  type: 'copyCode';
  payload: {
    code: string;
  };
}

export interface ReadyMessage {
  type: 'ready';
}

/**
 * Message types from extension to webview
 */
export type ExtensionMessage =
  | IconDataMessage
  | FavoritesMessage
  | InsertSuccessMessage
  | ErrorMessage;

export interface IconDataMessage {
  type: 'iconData';
  payload: IconData;
}

export interface FavoritesMessage {
  type: 'favorites';
  payload: {
    favorites: string[];
  };
}

export interface InsertSuccessMessage {
  type: 'insertSuccess';
  payload: {
    iconName: string;
  };
}

export interface ErrorMessage {
  type: 'error';
  payload: {
    message: string;
  };
}
