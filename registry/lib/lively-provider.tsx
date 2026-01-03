"use client";

import * as React from "react";
import type { LivelyIconConfig } from "@/lib/lively-types";

/**
 * Default icon configuration
 */
const DEFAULT_CONFIG: LivelyIconConfig = {
  animated: true,
  defaultSize: 24,
  defaultStrokeWidth: 2,
};

/**
 * Lively icon context
 */
const LivelyContext = React.createContext<LivelyIconConfig | undefined>(
  undefined
);

/**
 * Props for LivelyProvider component
 */
export interface LivelyProviderProps {
  children: React.ReactNode;
  config?: Partial<LivelyIconConfig>;
}

/**
 * Provider component for Lively icon configuration
 *
 * Wrap your app or component tree with this provider to set global icon defaults.
 *
 * @example
 * ```tsx
 * <LivelyProvider config={{ animated: false, defaultSize: 32 }}>
 *   <App />
 * </LivelyProvider>
 * ```
 */
export function LivelyProvider({
  children,
  config,
}: LivelyProviderProps): React.JSX.Element {
  const mergedConfig: LivelyIconConfig = {
    ...DEFAULT_CONFIG,
    ...config,
  };

  return (
    <LivelyContext.Provider value={mergedConfig}>
      {children}
    </LivelyContext.Provider>
  );
}

/**
 * Hook to access Lively icon context configuration
 *
 * Returns the current icon configuration from context, or default config if not in a provider.
 */
export function useLivelyContext(): LivelyIconConfig {
  const context = React.useContext(LivelyContext);
  return context ?? DEFAULT_CONFIG;
}
