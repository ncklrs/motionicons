import type { Metadata } from "next";
import Script from "next/script";
import VSCodePageClient from "./VSCodePageClient";

const baseUrl = "https://livelyicons.com";

export const metadata: Metadata = {
  title: "VS Code Extension — Browse & Insert Animated Icons",
  description:
    "LivelyIcons for VS Code: Browse 1,300+ animated icons, customize size/stroke/color, preview animations, and insert React/Vue/SVG code directly in your editor. Free and open-source.",
  keywords: [
    "vscode extension",
    "vs code icons",
    "animated icons vscode",
    "react icons extension",
    "svg icon picker",
    "vscode icon picker",
    "code snippets icons",
    "developer tools",
  ],
  openGraph: {
    title: "VS Code Extension | LivelyIcons",
    description:
      "Browse 1,300+ animated icons and insert code directly in VS Code. Customize animations, preview in real-time, generate React/Vue/SVG.",
    url: `${baseUrl}/plugins/vscode`,
    type: "website",
  },
  twitter: {
    title: "VS Code Extension | LivelyIcons",
    description:
      "Browse 1,300+ animated icons and insert code directly in VS Code. Free and open-source.",
  },
  alternates: {
    canonical: `${baseUrl}/plugins/vscode`,
  },
};

// JSON-LD for the VS Code extension
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "LivelyIcons Picker",
  applicationCategory: "DeveloperApplication",
  applicationSubCategory: "IDE Extension",
  operatingSystem: "Windows, macOS, Linux",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  description:
    "VS Code extension for browsing, previewing, and inserting animated icons from the LivelyIcons library directly into your code.",
  featureList: [
    "Browse 1,300+ animated icons",
    "Fuzzy search with keyword matching",
    "36 category filters",
    "Live customization (size, stroke, color)",
    "Animation preview with 9 motion types",
    "4 trigger modes (hover, loop, mount, inView)",
    "React/JSX code generation",
    "Vue template code generation",
    "Raw SVG export",
    "Favorites and recent icons",
    "One-click code insertion",
  ],
  softwareVersion: "1.0.0",
  downloadUrl:
    "https://marketplace.visualstudio.com/items?itemName=livelyicons.livelyicons-picker",
  installUrl:
    "https://marketplace.visualstudio.com/items?itemName=livelyicons.livelyicons-picker",
  screenshot: `${baseUrl}/plugins/vscode-screenshot.png`,
  author: {
    "@type": "Organization",
    name: "LivelyIcons",
    url: baseUrl,
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5",
    ratingCount: "1",
    bestRating: "5",
  },
};

export default function VSCodePage() {
  return (
    <>
      <Script
        id="json-ld-vscode"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(jsonLd)}
      </Script>
      <VSCodePageClient />
    </>
  );
}
