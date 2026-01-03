import type { Metadata } from "next";
import Script from "next/script";
import BundleSizePageClient from "./BundleSizePageClient";

const baseUrl = "https://livelyicons.com";

export const metadata: Metadata = {
  title: "Bundle Size Analysis — Tree-Shaking Proof",
  description:
    "Verify LivelyIcons tree-shaking with real bundle size benchmarks. Import 1 icon at 1.8KB gzip, save 99%+ vs full import. Fully tree-shakeable with ESM exports and no side effects.",
  keywords: [
    "bundle size",
    "tree shaking",
    "icon library size",
    "react bundle optimization",
    "import cost",
    "gzip size",
    "esm tree shaking",
  ],
  openGraph: {
    title: "Bundle Size Analysis | LivelyIcons",
    description:
      "Verify tree-shaking with real benchmarks. 1 icon = 1.8KB gzip. Save 99%+ vs full import.",
    url: `${baseUrl}/bundle-size`,
    type: "website",
  },
  twitter: {
    title: "Bundle Size Analysis | LivelyIcons",
    description:
      "Verify tree-shaking with real benchmarks. 1 icon = 1.8KB gzip. Save 99%+ vs full import.",
  },
  alternates: {
    canonical: `${baseUrl}/bundle-size`,
  },
};

// JSON-LD for technical documentation
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: "LivelyIcons Bundle Size Analysis",
  description:
    "Technical analysis of LivelyIcons bundle size with tree-shaking benchmarks",
  url: `${baseUrl}/bundle-size`,
  author: {
    "@type": "Organization",
    name: "LivelyIcons",
  },
  about: {
    "@type": "SoftwareApplication",
    name: "LivelyIcons",
  },
  articleSection: "Performance",
  keywords: [
    "tree shaking",
    "bundle size",
    "ESM",
    "JavaScript optimization",
  ],
};

export default function BundleSizePage() {
  return (
    <>
      <Script
        id="json-ld-bundle-size"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(jsonLd)}
      </Script>
      <BundleSizePageClient />
    </>
  );
}
