import { useMemo, useCallback, useState } from 'react';
import type { ExtendedCustomization } from './DetailPanel';
import './CodePreview.css';

export interface CodePreviewProps {
  /** Icon name (kebab-case, e.g., 'arrow-right') */
  iconName: string;
  /** Current customization settings */
  customization: ExtendedCustomization;
}

/**
 * Converts kebab-case to PascalCase for component name
 * e.g., 'arrow-right' -> 'ArrowRight'
 */
function toPascalCase(str: string): string {
  return str
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

/**
 * Default values for comparison
 */
const DEFAULTS = {
  size: 24,
  strokeWidth: 2,
  lively: 'scale',
  trigger: 'hover',
  animated: true,
};

/**
 * Parse props string and return highlighted elements
 */
function parseAndHighlightProps(propsString: string): React.ReactNode[] {
  const result: React.ReactNode[] = [];
  const propRegex = /(\w+)=((?:\{[^}]+\})|(?:"[^"]+"))/g;
  let match = propRegex.exec(propsString);
  let keyIndex = 0;

  while (match !== null) {
    const [, propName, propValue] = match;
    result.push(
      <span key={keyIndex++}>
        {' '}
        <span className="code-prop">{propName}</span>
        <span className="code-punctuation">=</span>
        {propValue.startsWith('{') ? (
          <span className="code-value">{propValue}</span>
        ) : (
          <span className="code-string">{propValue}</span>
        )}
      </span>
    );
    match = propRegex.exec(propsString);
  }

  return result;
}

/**
 * Code preview component with syntax highlighting
 */
export function CodePreview({ iconName, customization }: CodePreviewProps) {
  const [copied, setCopied] = useState(false);

  const componentName = useMemo(() => toPascalCase(iconName), [iconName]);

  /**
   * Generate JSX props string, only including non-default values
   */
  const propsString = useMemo(() => {
    const props: string[] = [];

    if (customization.size && customization.size !== DEFAULTS.size) {
      props.push(`size={${customization.size}}`);
    }

    if (customization.strokeWidth && customization.strokeWidth !== DEFAULTS.strokeWidth) {
      props.push(`strokeWidth={${customization.strokeWidth}}`);
    }

    if (customization.lively && customization.lively !== DEFAULTS.lively) {
      props.push(`lively="${customization.lively}"`);
    }

    if (customization.trigger && customization.trigger !== DEFAULTS.trigger) {
      props.push(`trigger="${customization.trigger}"`);
    }

    if (customization.animated === false) {
      props.push('animated={false}');
    }

    return props.length > 0 ? props.join(' ') : '';
  }, [customization]);

  /**
   * Generate the import statement
   */
  const importStatement = useMemo(() => {
    return `import { ${componentName} } from 'motionicon'`;
  }, [componentName]);

  /**
   * Generate the JSX usage
   */
  const jsxUsage = useMemo(() => {
    if (propsString) {
      return `<${componentName} ${propsString} />`;
    }
    return `<${componentName} />`;
  }, [componentName, propsString]);

  /**
   * Full code block
   */
  const fullCode = useMemo(() => {
    return `${importStatement}\n\n${jsxUsage}`;
  }, [importStatement, jsxUsage]);

  /**
   * Handle copy to clipboard
   */
  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(fullCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }, [fullCode]);

  /**
   * Highlighted props for rendering
   */
  const highlightedProps = useMemo(() => {
    if (!propsString) return null;
    return parseAndHighlightProps(propsString);
  }, [propsString]);

  return (
    <div className="code-preview">
      <div className="code-preview-header">
        <span className="code-preview-label">TSX</span>
        <button
          className="code-preview-copy"
          onClick={handleCopy}
          type="button"
          aria-label={copied ? 'Copied!' : 'Copy code'}
        >
          {copied ? (
            <>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              Copy
            </>
          )}
        </button>
      </div>
      <pre className="code-preview-content">
        <code>
          {/* Import statement with syntax highlighting */}
          <span className="code-keyword">import</span>
          <span className="code-punctuation">{' { '}</span>
          <span className="code-component">{componentName}</span>
          <span className="code-punctuation">{' } '}</span>
          <span className="code-keyword">from</span>
          <span className="code-string">{" 'motionicon'"}</span>
          {'\n\n'}
          {/* JSX usage with syntax highlighting */}
          <span className="code-punctuation">{'<'}</span>
          <span className="code-component">{componentName}</span>
          {highlightedProps}
          <span className="code-punctuation">{' />'}</span>
        </code>
      </pre>
    </div>
  );
}
