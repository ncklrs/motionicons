import type { Metadata } from "next";
import Script from "next/script";
import HomePageClient from "./HomePageClient";

const baseUrl = "https://livelyicons.com";

// Override the default metadata for the homepage
export const metadata: Metadata = {
  title: "LivelyIcons — Animated React Icon Library with Motion",
  description:
    "A comprehensive React icon library with 1300+ beautifully animated SVG icons. Built-in hover animations, 14 motion types (scale, rotate, pulse, bounce, draw, spin, ring, wiggle, heartbeat, swing, float), tree-shakeable, TypeScript-first, and accessible by default.",
  alternates: {
    canonical: baseUrl,
  },
};

// Enhanced JSON-LD for homepage with breadcrumbs and main content
const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: baseUrl,
    },
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to use LivelyIcons in your React project",
  description:
    "Add animated icons to your React application with LivelyIcons",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Install the package",
      text: "Run npm install livelyicons or pnpm add livelyicons",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Import icons",
      text: "Import icons from livelyicons: import { Heart, Star } from 'livelyicons'",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Add animation",
      text: "Use the lively prop to add animation: <Heart lively=\"pulse\" />",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Customize trigger",
      text: "Choose trigger mode: hover, loop, mount, or inView",
    },
  ],
  totalTime: "PT5M",
  tool: [
    {
      "@type": "HowToTool",
      name: "Node.js",
    },
    {
      "@type": "HowToTool",
      name: "React",
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <Script
        id="json-ld-breadcrumb"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(breadcrumbJsonLd)}
      </Script>
      <Script
        id="json-ld-howto"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(howToJsonLd)}
      </Script>
      <HomePageClient />
    </>
  );
}
