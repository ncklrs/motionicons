import { useState, useEffect, useCallback, useRef } from 'react';
import type { VSCodeAPI } from '../types';

export interface UseFavoritesReturn {
  /** List of favorite icon names */
  favorites: string[];
  /** Add an icon to favorites */
  addFavorite: (iconName: string) => void;
  /** Remove an icon from favorites */
  removeFavorite: (iconName: string) => void;
  /** Check if an icon is favorited */
  isFavorite: (iconName: string) => boolean;
  /** Toggle favorite status */
  toggleFavorite: (iconName: string) => void;
}

/**
 * Storage key for favorites in VSCode state
 */
const FAVORITES_KEY = 'motionicon-favorites';

/**
 * Hook for managing favorite icons
 *
 * - Loads favorites from VSCode state on mount
 * - Persists favorites to VSCode state
 * - Syncs with extension via postMessage
 */
export function useFavorites(): UseFavoritesReturn {
  const [favorites, setFavorites] = useState<string[]>([]);
  const vscodeRef = useRef<VSCodeAPI | null>(null);
  const isInitialized = useRef(false);

  /**
   * Initialize VSCode API and load persisted favorites
   */
  useEffect(() => {
    if (isInitialized.current) return;
    isInitialized.current = true;

    try {
      // Check if we're in VSCode context
      if (typeof acquireVsCodeApi === 'function') {
        vscodeRef.current = acquireVsCodeApi();

        // Try to load from VSCode state
        const state = vscodeRef.current.getState();
        const stateWithFavorites = state as { favorites?: string[] } | undefined;
        if (stateWithFavorites && Array.isArray(stateWithFavorites.favorites)) {
          setFavorites(stateWithFavorites.favorites);
        }
      } else {
        // Fallback for development: try localStorage
        try {
          const stored = localStorage.getItem(FAVORITES_KEY);
          if (stored) {
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed)) {
              setFavorites(parsed);
            }
          }
        } catch {
          // Ignore localStorage errors
        }
      }
    } catch {
      // Not in VSCode context
    }
  }, []);

  /**
   * Persist favorites whenever they change
   */
  useEffect(() => {
    if (!isInitialized.current) return;

    try {
      if (vscodeRef.current) {
        // Get current state and merge with new favorites
        // Note: We store favorites as a custom property in the state
        const currentState = vscodeRef.current.getState();
        const stateWithFavorites = { ...currentState, favorites } as unknown;
        vscodeRef.current.setState(stateWithFavorites as Parameters<typeof vscodeRef.current.setState>[0]);

        // Notify extension about favorites update via custom message
        // Cast is needed because WebviewToExtensionMessage doesn't include favorites
        vscodeRef.current.postMessage({
          type: 'updateState',
          state: { recentIcons: favorites },
        });
      } else {
        // Fallback for development: use localStorage
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
      }
    } catch {
      // Ignore persistence errors
    }
  }, [favorites]);

  /**
   * Listen for favorites updates from extension
   */
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const message = event.data;
      if (message && message.type === 'favoritesUpdated' && Array.isArray(message.favorites)) {
        setFavorites(message.favorites);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  /**
   * Add an icon to favorites
   */
  const addFavorite = useCallback((iconName: string) => {
    setFavorites((prev) => {
      if (prev.includes(iconName)) {
        return prev;
      }
      return [...prev, iconName];
    });
  }, []);

  /**
   * Remove an icon from favorites
   */
  const removeFavorite = useCallback((iconName: string) => {
    setFavorites((prev) => prev.filter((name) => name !== iconName));
  }, []);

  /**
   * Check if an icon is in favorites
   */
  const isFavorite = useCallback(
    (iconName: string) => {
      return favorites.includes(iconName);
    },
    [favorites]
  );

  /**
   * Toggle favorite status
   */
  const toggleFavorite = useCallback(
    (iconName: string) => {
      if (isFavorite(iconName)) {
        removeFavorite(iconName);
      } else {
        addFavorite(iconName);
      }
    },
    [isFavorite, addFavorite, removeFavorite]
  );

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    toggleFavorite,
  };
}
