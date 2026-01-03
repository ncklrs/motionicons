import type { Metadata } from "next";
import Script from "next/script";
import PluginsPageClient from "./PluginsPageClient";

const baseUrl = "https://livelyicons.com";

export const metadata: Metadata = {
  title: "Plugins & Extensions — VS Code and Figma Integrations",
  description:
    "LivelyIcons plugins for VS Code and Figma. Browse 1,300+ animated icons directly in your favorite design and development tools. Free, open-source integrations.",
  keywords: [
    "livelyicons plugins",
    "icon plugins",
    "vscode icons",
    "figma icons",
    "developer tools",
    "design tools",
    "icon extensions",
    "animated icons tools",
  ],
  openGraph: {
    title: "Plugins & Extensions | LivelyIcons",
    description:
      "Use LivelyIcons in VS Code and Figma. Browse, customize, and insert animated icons directly in your workflow.",
    url: `${baseUrl}/plugins`,
    type: "website",
  },
  twitter: {
    title: "Plugins & Extensions | LivelyIcons",
    description:
      "Use LivelyIcons in VS Code and Figma. Free, open-source integrations.",
  },
  alternates: {
    canonical: `${baseUrl}/plugins`,
  },
};

// JSON-LD for the plugins collection
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "LivelyIcons Plugins & Extensions",
  description:
    "Official plugins and extensions for using LivelyIcons in VS Code and Figma",
  url: `${baseUrl}/plugins`,
  mainEntity: {
    "@type": "ItemList",
    name: "LivelyIcons Integrations",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "VS Code Extension",
        description: "Browse and insert animated icons directly in VS Code",
        url: `${baseUrl}/plugins/vscode`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Figma Plugin",
        description:
          "Browse and insert animated icons directly in Figma designs",
        url: `${baseUrl}/plugins/figma`,
      },
    ],
  },
};

export default function PluginsPage() {
  return (
    <>
      <Script
        id="json-ld-plugins"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(jsonLd)}
      </Script>
      <PluginsPageClient />
    </>
  );
}
