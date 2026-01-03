import React from 'react';

/**
 * SVG element definition from icon data
 */
export interface SVGElementDef {
  type: string;
  attributes: Record<string, string | number>;
}

/**
 * Renders SVG elements from icon.elements data
 * Handles: path, polyline, line, rect, circle, polygon
 *
 * @param elements - Array of SVG element definitions
 * @returns React nodes for each SVG element
 */
export function renderSvgElements(elements: SVGElementDef[]): React.ReactNode[] {
  return elements.map((element, index) => {
    const key = `${element.type}-${index}`;
    const attrs = { ...element.attributes };

    // Convert numeric attributes to strings for React
    const stringAttrs: Record<string, string> = {};
    for (const [attrKey, value] of Object.entries(attrs)) {
      stringAttrs[attrKey] = String(value);
    }

    switch (element.type) {
      case 'path':
        return <path key={key} {...stringAttrs} />;

      case 'polyline':
        return <polyline key={key} {...stringAttrs} />;

      case 'line':
        return <line key={key} {...stringAttrs} />;

      case 'rect':
        return <rect key={key} {...stringAttrs} />;

      case 'circle':
        return <circle key={key} {...stringAttrs} />;

      case 'polygon':
        return <polygon key={key} {...stringAttrs} />;

      case 'ellipse':
        return <ellipse key={key} {...stringAttrs} />;

      case 'g':
        // Handle groups recursively if they contain children
        return <g key={key} {...stringAttrs} />;

      default:
        // For unknown element types, log a warning in dev and skip
        if (process.env.NODE_ENV === 'development') {
          console.warn(`Unknown SVG element type: ${element.type}`);
        }
        return null;
    }
  });
}

/**
 * Default SVG attributes for icons following Lucide conventions
 */
export const defaultSvgAttributes = {
  xmlns: 'http://www.w3.org/2000/svg',
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};
