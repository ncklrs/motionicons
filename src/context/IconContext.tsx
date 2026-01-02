'use client';

/**
 * Icon configuration context for global icon settings
 *
 * Provides default configuration for all icons in the component tree.
 * Individual icon props can override context values.
 */

import React, { createContext, useContext, type ReactNode } from 'react';
import type { IconConfig } from '../lib/types';

/**
 * Default icon configuration
 */
const DEFAULT_CONFIG: IconConfig = {
  animated: true,
  defaultSize: 24,
  defaultStrokeWidth: 2
};

/**
 * Icon context with optional configuration
 */
const IconContext = createContext<IconConfig | undefined>(undefined);

/**
 * Props for IconProvider component
 */
export interface IconProviderProps {
  /**
   * Child components
   */
  children: ReactNode;

  /**
   * Icon configuration to apply to all icons in the tree
   * Partial configuration will be merged with defaults
   */
  config?: Partial<IconConfig>;
}

/**
 * Provider component for icon configuration
 *
 * Wrap your app or component tree with this provider to set global icon defaults.
 * Configuration can be partially overridden at any level.
 *
 * @example
 * ```tsx
 * <IconProvider config={{ animated: false, defaultSize: 32 }}>
 *   <App />
 * </IconProvider>
 * ```
 */
export function IconProvider({ children, config }: IconProviderProps): React.JSX.Element {
  const mergedConfig: IconConfig = {
    ...DEFAULT_CONFIG,
    ...config
  };

  return (
    <IconContext.Provider value={mergedConfig}>
      {children}
    </IconContext.Provider>
  );
}

/**
 * Hook to access icon context configuration
 *
 * Returns the current icon configuration from context, or default config if not in a provider.
 * This hook is used internally by icon components and other hooks.
 *
 * @returns Current icon configuration
 *
 * @example
 * ```tsx
 * const config = useIconContext();
 * console.log(config.defaultSize); // 24
 * ```
 */
export function useIconContext(): IconConfig {
  const context = useContext(IconContext);
  return context ?? DEFAULT_CONFIG;
}
