import { useRef, useEffect } from 'react';

export interface TrustedSvgRendererProps {
  /**
   * SVG content string from the extension's bundled icon library.
   *
   * SECURITY NOTE: This component is designed ONLY for rendering trusted SVG
   * content from the extension's bundled assets. The SVG content is:
   * 1. Loaded from the extension's bundled icon library
   * 2. Validated by the extension host before being passed to the webview
   * 3. Never sourced from user input or external sources
   *
   * This matches the existing pattern in App.tsx where renderTrustedSvg is used.
   */
  svgContent: string;
  /** Size of the SVG in pixels */
  size?: number;
  /** Additional className */
  className?: string;
}

/**
 * Renders trusted SVG content from the extension's bundled icon library.
 *
 * This component uses the DOMParser API to safely parse SVG content and
 * then renders it using DOM manipulation. This approach is used because:
 * 1. SVG icons are stored as strings in the icon library
 * 2. We need to dynamically apply size and style attributes
 * 3. The content source is the extension's trusted bundle
 *
 * The component follows the same security model as the existing App.tsx
 * renderTrustedSvg function.
 */
export function TrustedSvgRenderer({
  svgContent,
  size = 24,
  className,
}: TrustedSvgRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !svgContent) return;

    // Clear previous content
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    // Parse the SVG using DOMParser (safe for trusted content)
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgContent, 'image/svg+xml');
    const svgElement = doc.querySelector('svg');

    if (svgElement) {
      // Apply size attributes
      svgElement.setAttribute('width', String(size));
      svgElement.setAttribute('height', String(size));

      // Clone and append to container
      const clonedSvg = svgElement.cloneNode(true) as SVGElement;
      container.appendChild(clonedSvg);
    }
  }, [svgContent, size]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      aria-hidden="true"
    />
  );
}
