import type { Metadata } from "next";
import Script from "next/script";
import PlaygroundPageClient from "./PlaygroundPageClient";

const baseUrl = "https://livelyicons.com";

export const metadata: Metadata = {
  title: "Icon Playground — Customize & Preview Animations",
  description:
    "Interactive icon editor with live preview. Customize size, stroke width, colors, and animations. Choose from 9 motion types and 4 trigger modes. Generate React, Vue, or SVG code instantly.",
  keywords: [
    "icon playground",
    "icon editor",
    "customize icons",
    "animation preview",
    "icon code generator",
    "react icon customizer",
    "svg editor",
  ],
  openGraph: {
    title: "Icon Playground | LivelyIcons",
    description:
      "Interactive icon editor with live preview. Customize animations and generate code instantly.",
    url: `${baseUrl}/playground`,
    type: "website",
  },
  twitter: {
    title: "Icon Playground | LivelyIcons",
    description:
      "Interactive icon editor with live preview. Customize animations and generate code instantly.",
  },
  alternates: {
    canonical: `${baseUrl}/playground`,
  },
};

// JSON-LD for the playground tool
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "LivelyIcons Playground",
  description:
    "Interactive icon customization tool with live animation preview",
  url: `${baseUrl}/playground`,
  applicationCategory: "DesignApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  featureList: [
    "Live icon preview",
    "Adjustable size (16-128px)",
    "Customizable stroke width",
    "Color picker",
    "9 animation types",
    "4 trigger modes",
    "Code generation for React, Vue, SVG",
    "SVG download",
  ],
};

export default function PlaygroundPage() {
  return (
    <>
      <Script
        id="json-ld-playground"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(jsonLd)}
      </Script>
      <PlaygroundPageClient />
    </>
  );
}
