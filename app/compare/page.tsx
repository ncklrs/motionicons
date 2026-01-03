import type { Metadata } from "next";
import Script from "next/script";
import ComparePageClient from "./ComparePageClient";

const baseUrl = "https://livelyicons.com";

export const metadata: Metadata = {
  title: "Compare Icon Libraries — LivelyIcons vs Lucide, Heroicons, Phosphor",
  description:
    "Compare LivelyIcons with popular React icon libraries. See feature comparison of animations, bundle size, TypeScript support, and tree-shaking. LivelyIcons is the only library with built-in animations.",
  keywords: [
    "icon library comparison",
    "lucide vs livelyicons",
    "heroicons alternative",
    "phosphor icons comparison",
    "best react icon library",
    "animated icons comparison",
    "react icons benchmark",
  ],
  openGraph: {
    title: "Compare Icon Libraries | LivelyIcons",
    description:
      "LivelyIcons vs Lucide, Heroicons, Phosphor. Feature comparison showing why LivelyIcons is the only library with built-in animations.",
    url: `${baseUrl}/compare`,
    type: "website",
  },
  twitter: {
    title: "Compare Icon Libraries | LivelyIcons",
    description:
      "LivelyIcons vs Lucide, Heroicons, Phosphor. The only library with built-in animations.",
  },
  alternates: {
    canonical: `${baseUrl}/compare`,
  },
};

// JSON-LD comparison table
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Icon Library Comparison",
  description:
    "Compare LivelyIcons with other popular React icon libraries including Lucide, Heroicons, and Phosphor Icons",
  url: `${baseUrl}/compare`,
  mainEntity: {
    "@type": "Table",
    about: "React icon library feature comparison",
  },
  mentions: [
    {
      "@type": "SoftwareApplication",
      name: "LivelyIcons",
      description: "Animated icons powered by Motion for React",
      url: "https://livelyicons.com",
    },
    {
      "@type": "SoftwareApplication",
      name: "Lucide",
      description: "Beautiful & consistent icon toolkit",
      url: "https://lucide.dev",
    },
    {
      "@type": "SoftwareApplication",
      name: "Heroicons",
      description: "Hand-crafted icons by the Tailwind team",
      url: "https://heroicons.com",
    },
    {
      "@type": "SoftwareApplication",
      name: "Phosphor Icons",
      description: "Flexible icon family for interfaces",
      url: "https://phosphoricons.com",
    },
  ],
};

export default function ComparePage() {
  return (
    <>
      <Script
        id="json-ld-compare"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(jsonLd)}
      </Script>
      <ComparePageClient />
    </>
  );
}
