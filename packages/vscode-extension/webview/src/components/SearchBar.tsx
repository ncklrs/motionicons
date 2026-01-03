import React, { memo, useCallback, useEffect, useRef, useState } from 'react';

export interface SearchBarProps {
  /** Current search value */
  value: string;
  /** Change handler (called with debounced value) */
  onChange: (value: string) => void;
  /** Total number of icons available */
  iconCount?: number;
  /** Debounce delay in milliseconds */
  debounceMs?: number;
  /** Placeholder text */
  placeholder?: string;
}

/**
 * Search input component with debounced onChange
 * Features: search icon, clear button, keyboard shortcut hint (Cmd+K)
 */
export const SearchBar = memo(function SearchBar({
  value,
  onChange,
  iconCount,
  debounceMs = 300,
  placeholder,
}: SearchBarProps) {
  const defaultPlaceholder = iconCount
    ? `Search ${iconCount.toLocaleString()}+ icons...`
    : 'Search icons...';
  const finalPlaceholder = placeholder || defaultPlaceholder;
  const inputRef = useRef<HTMLInputElement>(null);
  const [localValue, setLocalValue] = useState(value);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  // Sync local value when prop changes externally
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  // Debounced onChange
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setLocalValue(newValue);

      // Clear existing timeout
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      // Set new timeout for debounced callback
      debounceRef.current = setTimeout(() => {
        onChange(newValue);
      }, debounceMs);
    },
    [onChange, debounceMs]
  );

  // Clear search handler
  const handleClear = useCallback(() => {
    setLocalValue('');
    onChange('');
    inputRef.current?.focus();
  }, [onChange]);

  // Keyboard shortcut: Cmd/Ctrl+K to focus
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
        inputRef.current?.select();
      }
      // Escape to clear and blur
      if (e.key === 'Escape' && document.activeElement === inputRef.current) {
        if (localValue) {
          handleClear();
        } else {
          inputRef.current?.blur();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [localValue, handleClear]);

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  const hasValue = localValue.length > 0;
  const isMac = typeof navigator !== 'undefined' && /Mac/.test(navigator.platform);

  return (
    <div className="search-bar">
      <div className="search-bar-input-wrapper">
        {/* Search icon */}
        <span className="search-bar-icon" aria-hidden="true">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
        </span>

        {/* Input field */}
        <input
          ref={inputRef}
          type="text"
          className="search-bar-input"
          value={localValue}
          onChange={handleChange}
          placeholder={finalPlaceholder}
          aria-label="Search icons"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
        />

        {/* Clear button or keyboard shortcut hint */}
        {hasValue ? (
          <button
            className="search-bar-clear"
            onClick={handleClear}
            aria-label="Clear search"
            type="button"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6L6 18" />
              <path d="M6 6l12 12" />
            </svg>
          </button>
        ) : (
          <span className="search-bar-shortcut" aria-hidden="true">
            <kbd>{isMac ? 'Cmd' : 'Ctrl'}</kbd>
            <kbd>K</kbd>
          </span>
        )}
      </div>
    </div>
  );
});

export default SearchBar;
