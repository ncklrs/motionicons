import type { Metadata } from "next";
import Script from "next/script";
import FigmaPageClient from "./FigmaPageClient";

const baseUrl = "https://livelyicons.com";

export const metadata: Metadata = {
  title: "Figma Plugin — 1,319 Animated Icons for Design",
  description:
    "LivelyIcons for Figma: Browse 1,319 animated icons in 36 categories. Customize size, stroke, color. Insert editable vectors or export SVG/React/Vue code. Works offline.",
  keywords: [
    "figma plugin",
    "figma icons",
    "animated icons figma",
    "svg icons figma",
    "icon plugin",
    "figma community",
    "design icons",
    "ui icons figma",
  ],
  openGraph: {
    title: "Figma Plugin | LivelyIcons",
    description:
      "Browse 1,319 animated icons, customize and insert directly into Figma. Editable vectors, export to SVG/React/Vue. Free and works offline.",
    url: `${baseUrl}/plugins/figma`,
    type: "website",
  },
  twitter: {
    title: "Figma Plugin | LivelyIcons",
    description:
      "1,319 animated icons for Figma. Customize, insert, and export. Free and works offline.",
  },
  alternates: {
    canonical: `${baseUrl}/plugins/figma`,
  },
};

// JSON-LD for the Figma plugin
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "LivelyIcons for Figma",
  applicationCategory: "DesignApplication",
  applicationSubCategory: "Figma Plugin",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  description:
    "Figma plugin for browsing, customizing, and inserting 1,319 animated icons directly into your designs.",
  featureList: [
    "1,319 animated icons",
    "36 organized categories",
    "Fuzzy search with synonyms",
    "Size presets (16px, 24px, 32px, 48px, 64px)",
    "Adjustable stroke width (0.5 to 4.0)",
    "Full color customization",
    "Live preview panel",
    "Insert as editable Figma vectors",
    "SVG code export",
    "React component export",
    "Vue template export",
    "Works offline - no network required",
    "Sub-second load time",
  ],
  softwareVersion: "0.1.0",
  downloadUrl: "https://www.figma.com/community/plugin/livelyicons",
  installUrl: "https://www.figma.com/community/plugin/livelyicons",
  screenshot: `${baseUrl}/plugins/figma-screenshot.png`,
  author: {
    "@type": "Organization",
    name: "LivelyIcons",
    url: baseUrl,
  },
};

export default function FigmaPage() {
  return (
    <>
      <Script
        id="json-ld-figma"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(jsonLd)}
      </Script>
      <FigmaPageClient />
    </>
  );
}
