import type { Metadata } from "next";
import Script from "next/script";
import DocsPageClient from "./DocsPageClient";

const baseUrl = "https://livelyicons.com";

export const metadata: Metadata = {
  title: "Documentation — Installation, Usage & API Reference",
  description:
    "Complete guide to using LivelyIcons. Learn installation via npm/pnpm/yarn, basic usage, 14 animation types (scale, rotate, pulse, bounce, draw, spin, ring, wiggle, heartbeat, swing, float), trigger modes, IconProvider configuration, and customization options.",
  keywords: [
    "livelyicons documentation",
    "react icon library docs",
    "animated icons tutorial",
    "icon animation api",
    "motion icons guide",
    "typescript icons setup",
    "shadcn icons",
  ],
  openGraph: {
    title: "Documentation | LivelyIcons",
    description:
      "Complete guide to LivelyIcons. Installation, usage examples, animation types, and API reference.",
    url: `${baseUrl}/docs`,
    type: "website",
  },
  twitter: {
    title: "Documentation | LivelyIcons",
    description:
      "Complete guide to LivelyIcons. Installation, usage examples, animation types, and API reference.",
  },
  alternates: {
    canonical: `${baseUrl}/docs`,
  },
};

// JSON-LD for documentation with HowTo and FAQPage
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: "LivelyIcons Documentation",
  description:
    "Complete guide to using LivelyIcons animated React icon library",
  url: `${baseUrl}/docs`,
  author: {
    "@type": "Organization",
    name: "LivelyIcons",
  },
  articleSection: "Documentation",
  about: {
    "@type": "SoftwareApplication",
    name: "LivelyIcons",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I install LivelyIcons?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Install via npm: npm install livelyicons, or pnpm: pnpm add livelyicons, or yarn: yarn add livelyicons. LivelyIcons requires React 18+ and optionally Motion for animations.",
      },
    },
    {
      "@type": "Question",
      name: "What animation types are available?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "LivelyIcons supports 14 animation types: scale, rotate, translate, shake, pulse, bounce, draw, spin, ring, wiggle, heartbeat, swing, float, and none. Each can be triggered on hover, loop, mount, or when in view.",
      },
    },
    {
      "@type": "Question",
      name: "Does LivelyIcons support React Server Components?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! LivelyIcons provides static icon exports that work in React Server Components without requiring the Motion library. Import from 'livelyicons/static' for RSC compatibility.",
      },
    },
    {
      "@type": "Question",
      name: "How do I disable animations globally?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Wrap your app with IconProvider and set animated to false: <IconProvider config={{ animated: false }}>. Individual icons can override this with the animated prop.",
      },
    },
    {
      "@type": "Question",
      name: "Is LivelyIcons accessible?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, LivelyIcons automatically respects the prefers-reduced-motion setting. When users have reduced motion enabled, animations are disabled automatically.",
      },
    },
  ],
};

export default function DocsPage() {
  return (
    <>
      <Script
        id="json-ld-docs"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(jsonLd)}
      </Script>
      <Script
        id="json-ld-faq"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(faqJsonLd)}
      </Script>
      <DocsPageClient />
    </>
  );
}
