import type { Metadata } from "next";
import Script from "next/script";
import IconsPageClient from "./IconsPageClient";

const baseUrl = "https://livelyicons.com";

export const metadata: Metadata = {
  title: "Browse 1300+ Animated Icons",
  description:
    "Explore our complete collection of 1300+ animated React icons. Search by name or category, preview all 9 animation types, and copy code instantly. Free, open-source, and tree-shakeable.",
  keywords: [
    "icon browser",
    "react icon search",
    "animated icon gallery",
    "svg icon library",
    "icon categories",
    "download svg icons",
    "copy icon code",
  ],
  openGraph: {
    title: "Browse 1300+ Animated Icons | LivelyIcons",
    description:
      "Explore our complete collection of 1300+ animated React icons. Search, preview animations, and copy code instantly.",
    url: `${baseUrl}/icons`,
    type: "website",
  },
  twitter: {
    title: "Browse 1300+ Animated Icons | LivelyIcons",
    description:
      "Explore our complete collection of 1300+ animated React icons. Search, preview animations, and copy code instantly.",
  },
  alternates: {
    canonical: `${baseUrl}/icons`,
  },
};

// JSON-LD for the icon collection
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "LivelyIcons Icon Browser",
  description:
    "Browse and search 1300+ animated React icons with live previews",
  url: `${baseUrl}/icons`,
  mainEntity: {
    "@type": "ItemList",
    name: "Animated Icons Collection",
    description:
      "Complete collection of 1300+ animated SVG icons for React applications",
    numberOfItems: 1300,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "UI Icons",
        description: "User interface icons like buttons, menus, and controls",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Communication Icons",
        description: "Email, chat, phone, and messaging icons",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Media Icons",
        description: "Play, pause, volume, and media control icons",
      },
    ],
  },
};

export default function IconsPage() {
  return (
    <>
      <Script
        id="json-ld-icons"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(jsonLd)}
      </Script>
      <IconsPageClient />
    </>
  );
}
