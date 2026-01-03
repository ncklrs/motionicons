import { useCallback, useEffect, useRef, useState } from 'react';
import type {
  VSCodeAPI,
  WebviewState,
  WebviewToExtensionMessage,
  ExtensionToWebviewMessage,
  IconMetadata,
} from '../types';

/**
 * Default webview state
 */
const defaultState: WebviewState = {
  searchQuery: '',
  filters: {
    category: 'all',
    triggerMode: 'all',
    sortBy: 'name',
  },
  selectedIcon: null,
  recentIcons: [],
  filterPanelExpanded: false,
};

/**
 * Hook for VSCode webview API communication
 * Provides messaging, state persistence, and event handling
 */
export function useVSCode() {
  // Store the VSCode API reference
  const vscodeRef = useRef<VSCodeAPI | null>(null);

  // State for icons loaded from extension
  const [icons, setIcons] = useState<IconMetadata[]>([]);

  // State for the current webview state
  const [state, setStateInternal] = useState<WebviewState>(defaultState);

  // Track if we're running in VSCode or standalone
  const [isVSCode, setIsVSCode] = useState(false);

  // Error state
  const [error, setError] = useState<string | null>(null);

  // Theme state
  const [theme, setTheme] = useState<'light' | 'dark' | 'high-contrast'>('dark');

  // Initialize VSCode API
  useEffect(() => {
    try {
      // acquireVsCodeApi is only available in VSCode webview context
      if (typeof acquireVsCodeApi === 'function') {
        vscodeRef.current = acquireVsCodeApi();
        setIsVSCode(true);

        // Restore persisted state
        const persistedState = vscodeRef.current.getState();
        if (persistedState) {
          setStateInternal(persistedState);
        }

        // Notify extension that webview is ready
        vscodeRef.current.postMessage({ type: 'ready' });

        // Request icons from extension
        vscodeRef.current.postMessage({ type: 'requestIcons' });
      }
    } catch {
      // Not in VSCode context, running standalone (dev mode)
      console.log('Running in standalone mode (not in VSCode)');
    }
  }, []);

  // Listen for messages from extension
  useEffect(() => {
    const handleMessage = (event: MessageEvent<ExtensionToWebviewMessage>) => {
      const message = event.data;

      switch (message.type) {
        case 'iconsLoaded':
          setIcons(message.icons);
          break;
        case 'themeChanged':
          setTheme(message.theme);
          break;
        case 'stateRestored':
          setStateInternal(message.state);
          break;
        case 'error':
          setError(message.message);
          break;
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // State setter that also persists to VSCode
  const setState = useCallback((update: Partial<WebviewState>) => {
    setStateInternal((prevState) => {
      const newState = { ...prevState, ...update };

      // Persist state to VSCode
      if (vscodeRef.current) {
        vscodeRef.current.setState(newState);
        // Also notify extension of state change
        vscodeRef.current.postMessage({ type: 'updateState', state: update });
      }

      return newState;
    });
  }, []);

  // Post message wrapper with type safety
  const postMessage = useCallback((message: WebviewToExtensionMessage) => {
    if (vscodeRef.current) {
      vscodeRef.current.postMessage(message);
    } else {
      // In dev mode, log messages
      console.log('VSCode message (dev mode):', message);
    }
  }, []);

  // Helper to add icon to recent list
  const addToRecent = useCallback((iconName: string) => {
    setStateInternal((prevState) => {
      const recentIcons = [
        iconName,
        ...prevState.recentIcons.filter((name) => name !== iconName),
      ].slice(0, 10); // Keep only 10 most recent

      const newState = { ...prevState, recentIcons };

      if (vscodeRef.current) {
        vscodeRef.current.setState(newState);
      }

      return newState;
    });
  }, []);

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    // State
    icons,
    state,
    theme,
    error,
    isVSCode,

    // Actions
    setState,
    postMessage,
    addToRecent,
    clearError,
  };
}

export type UseVSCodeReturn = ReturnType<typeof useVSCode>;
