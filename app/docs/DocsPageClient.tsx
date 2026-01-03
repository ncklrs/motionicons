"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  Check,
  ArrowRight,
  Copy,
  Heart,
  Settings,
  Bell,
  Loader,
  Eye,
  Star,
  Menu,
  X,
} from "../../src/icons";
import { useState } from "react";
import { Navigation } from "../components/Navigation";

export default function DocsPageClient() {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const copyCode = (code: string, section: string) => {
    navigator.clipboard.writeText(code);
    setCopiedSection(section);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const CodeBlock = ({ code, section }: { code: string; section: string }) => (
    <div className="relative code-block group">
      <button
        onClick={() => copyCode(code, section)}
        className="absolute top-3 right-3 p-2 bg-graphite hover:bg-steel transition-colors opacity-0 group-hover:opacity-100"
      >
        {copiedSection === section ? (
          <Check size={16} className="text-electric" />
        ) : (
          <Copy size={16} className="text-silver" />
        )}
      </button>
      <pre className="p-6 overflow-x-auto text-sm leading-relaxed">
        <code className="text-ghost">{code}</code>
      </pre>
    </div>
  );

  const installCode = `pnpm add livelyicons
# or
npm install livelyicons
# or
yarn add livelyicons`;

  const cliCode = `# Search for icons by name (fuzzy matching)
npx livelyicons search arrow

# List all available icons
npx livelyicons list

# Copy import statement to clipboard
npx livelyicons copy heart

# Get detailed info about an icon
npx livelyicons info settings

# Compact list view
npx livelyicons list --compact`;

  const basicUsageCode = `import { Heart, Loader, Star } from 'livelyicons'

function App() {
  return (
    <div>
      {/* Default: scale animation on hover */}
      <Heart size={24} />

      {/* Custom lively type */}
      <Star lively="rotate" />

      {/* Continuous loop animation */}
      <Loader lively="spin" trigger="loop" />
    </div>
  )
}`;

  const livelysCode = `// 9 lively types available
<Star lively="scale" />      // Grow/shrink (default)
<Settings lively="rotate" /> // Spin rotation
<ArrowRight lively="translate" /> // Slide movement
<Bell lively="shake" />      // Shake/wobble
<Heart lively="pulse" />     // Heartbeat pulse
<Check lively="bounce" />    // Spring bounce
<Eye lively="draw" />        // SVG path draw
<Loader lively="spin" />     // Continuous spin
<Menu lively="none" />       // No animation`;

  const triggerModesCode = `// 4 trigger modes
<Heart trigger="hover" />   // On hover (default)
<Heart trigger="loop" />    // Continuous loop
<Heart trigger="mount" />   // Once on mount
<Heart trigger="inView" />  // When scrolled into view`;

  const providerCode = `import { IconProvider } from 'livelyicons'

// Disable all animations globally
<IconProvider config={{ animated: false }}>
  <App />
</IconProvider>

// Override at component level
<IconProvider config={{ animated: false }}>
  <Check />           {/* Static */}
  <Heart animated />  {/* Animated - overrides provider */}
</IconProvider>`;

  const accessibilityCode = `// Decorative icons (default)
<Heart />  {/* aria-hidden="true" */}

// Meaningful icons with labels
<Heart aria-label="Add to favorites" />
<Check aria-label="Task completed" />`;

  // Migration code examples
  const migrateLucideCode = `// Before: Lucide React
import { Heart, Star, Settings } from 'lucide-react'

<Heart size={24} strokeWidth={2} />
<Star className="text-yellow-500" />
<Settings onClick={handleClick} />

// After: LivelyIcons (drop-in replacement + animations)
import { Heart, Star, Settings } from 'livelyicons'

<Heart size={24} strokeWidth={2} />                    // Works exactly the same
<Star className="text-yellow-500" lively="rotate" /> // Now with animation!
<Settings onClick={handleClick} trigger="hover" />     // Interactive feedback`;

  const migrateHeroiconsCode = `// Before: Heroicons
import { HeartIcon, StarIcon } from '@heroicons/react/24/outline'

<HeartIcon className="h-6 w-6" />
<StarIcon className="h-6 w-6 text-yellow-500" />

// After: LivelyIcons
import { Heart, Star } from 'livelyicons'

<Heart size={24} />                               // size prop instead of classes
<Star size={24} className="text-yellow-500" lively="pulse" />`;

  const migrateReactIconsCode = `// Before: React Icons
import { FaHeart, FaStar } from 'react-icons/fa'
import { FiSettings } from 'react-icons/fi'

<FaHeart size={24} />
<FaStar color="gold" />
<FiSettings />

// After: LivelyIcons
import { Heart, Star, Settings } from 'livelyicons'

<Heart size={24} lively="pulse" />           // Built-in animations
<Star className="text-yellow-500" />              // Use className for colors
<Settings lively="rotate" trigger="hover" /> // Interactive rotation`;

  const migrateFeatherCode = `// Before: Feather Icons
import { Heart, Star, Settings } from 'react-feather'

<Heart size={24} strokeWidth={2} />
<Star color="currentColor" />

// After: LivelyIcons (nearly identical API)
import { Heart, Star, Settings } from 'livelyicons'

<Heart size={24} strokeWidth={2} />              // Same props work!
<Star className="text-current" lively="scale" /> // className for color`;

  // Framework code examples
  const nextAppRouterCode = `// app/layout.tsx - Next.js App Router
// Icons work in both Server and Client Components

// Server Component (default) - static icons only
import { Star, Check } from 'livelyicons'

export default function Layout({ children }) {
  return (
    <html>
      <body>
        {/* Static icons render on server */}
        <nav>
          <Star size={24} animated={false} />
        </nav>
        {children}
      </body>
    </html>
  )
}

// app/components/InteractiveIcon.tsx
// Client Component - for animations
'use client'

import { Heart } from 'livelyicons'

export function LikeButton() {
  return (
    <button>
      <Heart lively="pulse" trigger="hover" />
    </button>
  )
}`;

  const nextPagesRouterCode = `// pages/_app.tsx - Next.js Pages Router
import { IconProvider } from 'livelyicons'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <IconProvider config={{ animated: true }}>
      <Component {...pageProps} />
    </IconProvider>
  )
}

// pages/index.tsx
import { Heart, Star, Loader } from 'livelyicons'

export default function Home() {
  return (
    <div>
      <Heart lively="pulse" trigger="hover" />
      <Star lively="rotate" />
      <Loader lively="spin" trigger="loop" />
    </div>
  )
}`;

  const remixCode = `// app/root.tsx - Remix
import { IconProvider } from 'livelyicons'

export default function App() {
  return (
    <html>
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <IconProvider config={{ animated: true }}>
          <Outlet />
        </IconProvider>
        <Scripts />
      </body>
    </html>
  )
}

// app/routes/_index.tsx
import { Heart, Star } from 'livelyicons'

export default function Index() {
  return (
    <div>
      <Heart lively="pulse" />
      <Star lively="scale" trigger="hover" />
    </div>
  )
}`;

  const astroCode = `---
// src/components/AnimatedIcon.tsx
// Use client:load for interactive icons
---

// AnimatedIcon.tsx (React component)
import { Heart } from 'livelyicons'

export function AnimatedHeart() {
  return <Heart lively="pulse" trigger="hover" />
}

// src/pages/index.astro
---
import { AnimatedHeart } from '../components/AnimatedIcon'
import { Star } from 'livelyicons'
---

<html>
  <body>
    <!-- Static icon (no JS needed) -->
    <Star size={24} animated={false} />

    <!-- Interactive icon (hydrated) -->
    <AnimatedHeart client:load />
  </body>
</html>`;

  const viteCode = `// main.tsx - Vite + React
import React from 'react'
import ReactDOM from 'react-dom/client'
import { IconProvider } from 'livelyicons'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <IconProvider config={{ animated: true }}>
      <App />
    </IconProvider>
  </React.StrictMode>
)

// App.tsx
import { Heart, Star, Settings, Loader } from 'livelyicons'

function App() {
  return (
    <div>
      <Heart lively="pulse" trigger="hover" />
      <Star lively="scale" />
      <Settings lively="rotate" trigger="hover" />
      <Loader lively="spin" trigger="loop" />
    </div>
  )
}`;

  // Performance code examples
  const bundleOptimizationCode = `// Individual imports (recommended)
// Only bundles the icons you use
import { Heart, Star, Check } from 'livelyicons'

// Namespace import (larger bundle)
// Bundles entire icon library - avoid in production
import * as Icons from 'livelyicons'

// Dynamic imports for code splitting
const LazyHeart = lazy(() =>
  import('livelyicons').then(mod => ({ default: mod.Heart }))
)`;

  const staticVsAnimatedCode = `// Use static icons for:
// - Navigation menus with many icons
// - Lists with repeated icons
// - Server-rendered content
<Star animated={false} />
<Check animated={false} />

// Use animated icons for:
// - Call-to-action buttons
// - Interactive elements
// - Status indicators
// - Empty states
<Heart lively="pulse" trigger="hover" />
<Loader lively="spin" trigger="loop" />`;

  const reducedMotionCode = `// LivelyIcons respects prefers-reduced-motion automatically
// No additional code needed!

// For manual control:
import { IconProvider } from 'livelyicons'

function App() {
  // Disable animations for all icons
  return (
    <IconProvider config={{ animated: false }}>
      <YourApp />
    </IconProvider>
  )
}

// Or per-icon override
<Heart animated={false} />  // Force static
<Heart animated />          // Force animated (override provider)`;

  const lazyLoadingCode = `// Lazy load icons for routes/sections not immediately visible
import { lazy, Suspense } from 'react'

// Create lazy icon components
const LazySettingsIcon = lazy(() =>
  import('livelyicons').then(mod => ({ default: mod.Settings }))
)

function SettingsPanel() {
  return (
    <Suspense fallback={<div className="w-6 h-6 bg-gray-200 animate-pulse" />}>
      <LazySettingsIcon lively="rotate" />
    </Suspense>
  )
}

// Route-based code splitting (Next.js example)
// Icons in dynamically imported components split automatically
const DashboardIcons = dynamic(() => import('./DashboardIcons'))`;

  // Next.js App Router RSC code examples
  const rscStaticLayoutCode = `// app/layout.tsx - Server Component (no "use client" needed)
import { StaticHeart, StaticStar, StaticHome } from 'livelyicons/static';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <nav className="flex items-center gap-4 p-4 border-b">
          {/* Static icons render on server with zero client JS */}
          <StaticHome size={24} className="text-gray-600" />
          <StaticHeart size={20} className="text-red-500" />
          <StaticStar size={20} className="text-yellow-500" />
        </nav>
        {children}
      </body>
    </html>
  );
}`;

  const rscClientBoundaryCode = `// app/components/AnimatedHeart.tsx
'use client';

import { Heart } from 'livelyicons';

export function AnimatedHeart({ size = 24 }: { size?: number }) {
  return (
    <Heart
      size={size}
      lively="pulse"
      trigger="hover"
      className="text-red-500 cursor-pointer"
    />
  );
}

// app/page.tsx - Server Component
import { AnimatedHeart } from './components/AnimatedHeart';
import { StaticStar } from 'livelyicons/static';

export default function Page() {
  return (
    <div>
      {/* Client component for interactivity */}
      <AnimatedHeart size={32} />

      {/* Static icon renders on server */}
      <StaticStar size={24} />
    </div>
  );
}`;

  const rscCssAnimationCode = `// app/globals.css - Import CSS animations
@import 'livelyicons/css/styles.css';

// Or inject programmatically in layout.tsx
import { cssStylesheet } from 'livelyicons/css';

// Include in your global styles or use a <style> tag
// The cssStylesheet contains all animation keyframes

// app/page.tsx - Server Component with CSS animations
import { StaticHeart, StaticLoader } from 'livelyicons/static';

export default function Page() {
  return (
    <div>
      {/* Pulse animation via CSS - no client JS needed */}
      <StaticHeart
        size={24}
        animationClass="motionicon-pulse"
        className="text-red-500"
      />

      {/* Continuous spin via CSS */}
      <StaticLoader
        size={24}
        animationClass="motionicon-spin"
        className="text-blue-500"
      />
    </div>
  );
}`;

  const rscHybridPatternCode = `// Hybrid Pattern: Static layout + Animated content
// app/dashboard/layout.tsx - Server Component
import { StaticHome, StaticSettings, StaticBell } from 'livelyicons/static';
import { NotificationBell } from './NotificationBell';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      {/* Static sidebar renders on server */}
      <aside className="w-64 border-r p-4">
        <nav className="space-y-2">
          <a href="/" className="flex items-center gap-2">
            <StaticHome size={20} /> Home
          </a>
          <a href="/settings" className="flex items-center gap-2">
            <StaticSettings size={20} /> Settings
          </a>
        </nav>
      </aside>

      <main className="flex-1">
        {/* Client component for interactive notifications */}
        <header className="p-4 border-b flex justify-end">
          <NotificationBell />
        </header>
        {children}
      </main>
    </div>
  );
}

// app/dashboard/NotificationBell.tsx
'use client';

import { Bell } from 'livelyicons';
import { useState } from 'react';

export function NotificationBell() {
  const [hasNew, setHasNew] = useState(true);

  return (
    <button onClick={() => setHasNew(false)} className="relative">
      <Bell
        size={24}
        lively={hasNew ? 'shake' : 'scale'}
        trigger={hasNew ? 'loop' : 'hover'}
      />
      {hasNew && (
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
      )}
    </button>
  );
}`;

  const rscSuspenseFallbackCode = `// app/page.tsx - Lazy loading with Suspense
import { Suspense, lazy } from 'react';
import { StaticLoader } from 'livelyicons/static';

// Lazy load the animated icon component
const AnimatedDashboard = lazy(() => import('./AnimatedDashboard'));

export default function Page() {
  return (
    <div>
      {/* Static fallback while loading animated component */}
      <Suspense
        fallback={
          <div className="flex items-center justify-center p-8">
            <StaticLoader
              size={32}
              animationClass="motionicon-spin"
              className="text-blue-500"
            />
          </div>
        }
      >
        <AnimatedDashboard />
      </Suspense>
    </div>
  );
}

// app/AnimatedDashboard.tsx
'use client';

import { Heart, Star, Bell, Settings } from 'livelyicons';

export default function AnimatedDashboard() {
  return (
    <div className="grid grid-cols-4 gap-4 p-8">
      <Heart lively="pulse" trigger="hover" size={48} />
      <Star lively="rotate" trigger="hover" size={48} />
      <Bell lively="shake" trigger="hover" size={48} />
      <Settings lively="spin" trigger="hover" size={48} />
    </div>
  );
}`;

  // shadcn/ui integration code examples
  const shadcnInstallEssentialsCode = `# Install the essentials bundle (provider, hook, types + popular icons)
npx shadcn@latest add https://livelyicons.com/r/lively-essentials.json

# This installs:
# - LivelyProvider context
# - useLivelyAnimation hook
# - TypeScript types
# - Popular icons (Heart, Star, Check, etc.)`;

  const shadcnInstallIndividualCode = `# Install individual icons as needed
npx shadcn@latest add https://livelyicons.com/r/heart-pulse.json
npx shadcn@latest add https://livelyicons.com/r/activity.json
npx shadcn@latest add https://livelyicons.com/r/globe.json

# Install just the animation infrastructure
npx shadcn@latest add https://livelyicons.com/r/lively-provider.json
npx shadcn@latest add https://livelyicons.com/r/use-lively-animation.json
npx shadcn@latest add https://livelyicons.com/r/lively-types.json`;

  const shadcnBasicUsageCode = `// Import from your local components
import { HeartPulse } from "@/components/icons/heart-pulse"
import { Activity } from "@/components/icons/activity"
import { Globe } from "@/components/icons/globe"

function Dashboard() {
  return (
    <div className="flex items-center gap-4">
      {/* Pulse animation on hover */}
      <HeartPulse size={24} lively="pulse" />

      {/* Draw animation */}
      <Activity size={24} lively="draw" trigger="hover" />

      {/* Continuous rotation */}
      <Globe size={32} lively="rotate" trigger="loop" />
    </div>
  )
}`;

  const shadcnProviderUsageCode = `// app/layout.tsx or _app.tsx
import { LivelyProvider } from "@/lib/lively-provider"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <LivelyProvider
          config={{
            animated: true,
            defaultSize: 24,
            defaultStrokeWidth: 2,
          }}
        >
          {children}
        </LivelyProvider>
      </body>
    </html>
  )
}

// Now all icons inherit these defaults
import { HeartPulse } from "@/components/icons/heart-pulse"

function Component() {
  return <HeartPulse lively="pulse" /> // Uses default size of 24
}`;

  const shadcnCustomStylingCode = `import { HeartPulse } from "@/components/icons/heart-pulse"
import { cn } from "@/lib/utils"

// Using className with Tailwind
<HeartPulse
  size={24}
  className="text-red-500 hover:text-red-600"
  lively="pulse"
/>

// Using cn() for conditional styling
function LikeButton({ liked }: { liked: boolean }) {
  return (
    <button>
      <HeartPulse
        size={24}
        lively="pulse"
        className={cn(
          "transition-colors",
          liked ? "text-red-500 fill-red-500" : "text-muted-foreground"
        )}
      />
    </button>
  )
}

// CSS variable customization
<style>
  :root {
    --lively-icon-size: 24px;
    --lively-stroke-width: 2;
  }
</style>`;

  const shadcnFileStructureCode = `your-project/
├── components/
│   └── icons/
│       ├── heart-pulse.tsx    # Individual icon components
│       ├── activity.tsx
│       ├── globe.tsx
│       └── ...
├── hooks/
│   └── use-lively-animation.ts  # Animation hook
├── lib/
│   ├── lively-provider.tsx      # Context provider
│   ├── lively-types.ts          # TypeScript types
│   └── utils.ts                 # Your existing cn() utility
└── ...`;

  const sections = [
    { id: "installation", label: "Installation" },
    { id: "cli", label: "CLI Tool" },
    { id: "usage", label: "Basic Usage" },
    { id: "motion-types", label: "Motion Types" },
    { id: "triggers", label: "Trigger Modes" },
    { id: "animation", label: "Animation Control" },
    { id: "accessibility", label: "Accessibility" },
    { id: "api", label: "API Reference" },
    { id: "migration", label: "Migration Guide" },
    { id: "frameworks", label: "Framework Examples" },
    { id: "performance", label: "Performance" },
    { id: "nextjs-app-router", label: "Next.js App Router" },
    { id: "shadcn", label: "shadcn/ui" },
  ];

  const livelys = [
    {
      name: "Scale",
      type: "scale" as const,
      icon: Star,
      desc: "Grow and shrink",
    },
    {
      name: "Rotate",
      type: "rotate" as const,
      icon: Settings,
      desc: "Spin rotation",
    },
    {
      name: "Translate",
      type: "translate" as const,
      icon: ArrowRight,
      desc: "Slide movement",
    },
    { name: "Shake", type: "shake" as const, icon: Bell, desc: "Shake wobble" },
    {
      name: "Pulse",
      type: "pulse" as const,
      icon: Heart,
      desc: "Heartbeat effect",
    },
    {
      name: "Bounce",
      type: "bounce" as const,
      icon: Check,
      desc: "Spring bounce",
    },
    { name: "Draw", type: "draw" as const, icon: Eye, desc: "Path drawing" },
    {
      name: "Spin",
      type: "spin" as const,
      icon: Loader,
      desc: "Continuous spin",
    },
    { name: "None", type: "none" as const, icon: Menu, desc: "No animation" },
  ];

  const triggerModes = [
    { name: "hover", desc: "Animate on mouse hover", default: true },
    { name: "loop", desc: "Continuous looping animation" },
    { name: "mount", desc: "Animate once when component mounts" },
    { name: "inView", desc: "Animate when scrolled into viewport" },
  ];

  return (
    <div className="min-h-screen bg-void overflow-x-hidden">
      <Navigation />

      <div className="pt-16 flex overflow-hidden">
        {/* Sidebar */}
        <aside className="hidden lg:block w-64 fixed left-0 top-16 bottom-0 border-r border-graphite overflow-y-auto">
          <nav className="p-6 space-y-1">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="block px-4 py-2 text-sm text-silver hover:text-electric hover:bg-carbon transition-colors"
              >
                {section.label}
              </a>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-64 w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 min-w-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="tag tag-electric mb-4 inline-block">
              Documentation
            </span>
            <h1 className="font-display text-4xl font-bold text-bone mb-4">
              Getting Started
            </h1>
            <p className="text-silver text-lg mb-12">
              350+ animated icons with 9 motion types and 4 trigger modes for
              React.
            </p>
          </motion.div>

          {/* Installation */}
          <section id="installation" className="mb-16 scroll-mt-24">
            <h2 className="font-display text-2xl font-bold text-bone mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-graphite flex items-center justify-center text-sm text-electric">
                1
              </span>
              Installation
            </h2>
            <p className="text-silver mb-6">
              Install LivelyIcons using your package manager of choice:
            </p>
            <CodeBlock code={installCode} section="install" />
            <div className="mt-6 bg-carbon border border-graphite p-4">
              <h4 className="font-display font-semibold text-bone mb-2">
                Peer Dependencies
              </h4>
              <p className="text-sm text-silver">
                LivelyIcons requires{" "}
                <code className="text-electric">react &gt;= 18.0.0</code> and{" "}
                <code className="text-electric">motion &gt;= 11.0.0</code>
              </p>
            </div>
          </section>

          <div className="divider my-12" />

          {/* CLI Tool */}
          <section id="cli" className="mb-16 scroll-mt-24">
            <h2 className="font-display text-2xl font-bold text-bone mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-graphite flex items-center justify-center text-sm text-electric">
                2
              </span>
              CLI Tool
            </h2>
            <p className="text-silver mb-6">
              Use the CLI to search, explore, and quickly copy icons from your
              terminal:
            </p>
            <CodeBlock code={cliCode} section="cli" />

            <div className="mt-8 grid sm:grid-cols-2 gap-4">
              <div className="bg-carbon border border-graphite p-4">
                <h4 className="text-sm font-semibold text-bone mb-2 flex items-center gap-2">
                  <code className="text-electric">search</code>
                </h4>
                <p className="text-xs text-silver">
                  Fuzzy search icons by name. Partial matches work (e.g.,
                  &quot;arr&quot; finds &quot;arrow&quot;)
                </p>
              </div>
              <div className="bg-carbon border border-graphite p-4">
                <h4 className="text-sm font-semibold text-bone mb-2 flex items-center gap-2">
                  <code className="text-electric">list</code>
                </h4>
                <p className="text-xs text-silver">
                  List all 350+ icons. Use{" "}
                  <code className="text-electric">--compact</code> for condensed
                  output
                </p>
              </div>
              <div className="bg-carbon border border-graphite p-4">
                <h4 className="text-sm font-semibold text-bone mb-2 flex items-center gap-2">
                  <code className="text-electric">copy</code>
                </h4>
                <p className="text-xs text-silver">
                  Copy import statement directly to clipboard. Supports
                  kebab-case or PascalCase
                </p>
              </div>
              <div className="bg-carbon border border-graphite p-4">
                <h4 className="text-sm font-semibold text-bone mb-2 flex items-center gap-2">
                  <code className="text-electric">info</code>
                </h4>
                <p className="text-xs text-silver">
                  Get detailed information about a specific icon including file
                  location
                </p>
              </div>
            </div>
          </section>

          <div className="divider my-12" />

          {/* Basic Usage */}
          <section id="usage" className="mb-16 scroll-mt-24">
            <h2 className="font-display text-2xl font-bold text-bone mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-graphite flex items-center justify-center text-sm text-electric">
                3
              </span>
              Basic Usage
            </h2>
            <p className="text-silver mb-6">
              Import icons individually and use them as React components. Every
              icon supports <code className="text-electric">lively</code> and{" "}
              <code className="text-electric">trigger</code> props.
            </p>
            <CodeBlock code={basicUsageCode} section="usage" />

            <div className="mt-8 bg-carbon border border-graphite p-6">
              <h4 className="font-display font-semibold text-bone mb-3">
                Default Values
              </h4>
              <ul className="space-y-2 text-sm text-silver">
                <li className="flex items-center gap-3">
                  <span className="text-electric w-28">size</span>
                  <span className="text-steel">—</span>
                  <span>24 pixels</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-electric w-28">strokeWidth</span>
                  <span className="text-steel">—</span>
                  <span>2</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-electric w-28">lively</span>
                  <span className="text-steel">—</span>
                  <span>"scale"</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-electric w-28">trigger</span>
                  <span className="text-steel">—</span>
                  <span>"hover"</span>
                </li>
              </ul>
            </div>
          </section>

          <div className="divider my-12" />

          {/* Motion Types */}
          <section id="motion-types" className="mb-16 scroll-mt-24">
            <h2 className="font-display text-2xl font-bold text-bone mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-graphite flex items-center justify-center text-sm text-electric">
                4
              </span>
              Motion Types
            </h2>
            <p className="text-silver mb-6">
              Choose from 9 distinct animation styles using the{" "}
              <code className="text-electric">lively</code> prop:
            </p>

            {/* Interactive Demo Grid */}
            <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-3 mb-8">
              {livelys.map((item) => (
                <div key={item.name} className="group text-center">
                  <div className="aspect-square bg-carbon border border-graphite hover:border-electric/50 flex items-center justify-center cursor-pointer transition-colors">
                    <div className="text-electric">
                      <item.icon size={24} lively={item.type} />
                    </div>
                  </div>
                  <span className="text-xs text-silver mt-2 block">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-xs text-steel mb-6 text-center">
              Hover over icons to see each animation
            </p>

            <CodeBlock code={livelysCode} section="livelys" />

            <div className="mt-8 grid sm:grid-cols-3 gap-4">
              <div className="bg-carbon border border-graphite p-4">
                <h4 className="text-sm font-semibold text-bone mb-2">
                  Transform
                </h4>
                <p className="text-xs text-silver">
                  scale, rotate, translate, shake
                </p>
              </div>
              <div className="bg-carbon border border-graphite p-4">
                <h4 className="text-sm font-semibold text-bone mb-2">
                  Emphasis
                </h4>
                <p className="text-xs text-silver">pulse, bounce</p>
              </div>
              <div className="bg-carbon border border-graphite p-4">
                <h4 className="text-sm font-semibold text-bone mb-2">
                  Special
                </h4>
                <p className="text-xs text-silver">draw, spin, none</p>
              </div>
            </div>
          </section>

          <div className="divider my-12" />

          {/* Trigger Modes */}
          <section id="triggers" className="mb-16 scroll-mt-24">
            <h2 className="font-display text-2xl font-bold text-bone mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-graphite flex items-center justify-center text-sm text-electric">
                5
              </span>
              Trigger Modes
            </h2>
            <p className="text-silver mb-6">
              Control when animations play using the{" "}
              <code className="text-electric">trigger</code> prop:
            </p>

            {/* Interactive Trigger Demo */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {triggerModes.map((mode) => (
                <div
                  key={mode.name}
                  className="bg-carbon border border-graphite p-4"
                >
                  <div className="flex items-center justify-between mb-3">
                    <code className="text-electric text-sm">{mode.name}</code>
                    {mode.default && (
                      <span className="tag text-xs">default</span>
                    )}
                  </div>
                  <div className="h-16 flex items-center justify-center border border-graphite/50 mb-3">
                    <Heart
                      size={28}
                      lively="pulse"
                      trigger={
                        mode.name as "hover" | "loop" | "mount" | "inView"
                      }
                      className="text-electric"
                    />
                  </div>
                  <p className="text-xs text-silver">{mode.desc}</p>
                </div>
              ))}
            </div>

            <CodeBlock code={triggerModesCode} section="triggers" />
          </section>

          <div className="divider my-12" />

          {/* Animation Control */}
          <section id="animation" className="mb-16 scroll-mt-24">
            <h2 className="font-display text-2xl font-bold text-bone mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-graphite flex items-center justify-center text-sm text-electric">
                6
              </span>
              Animation Control
            </h2>
            <p className="text-silver mb-6">
              LivelyIcons provides three layers of animation control:
            </p>

            <div className="space-y-4 mb-8">
              {[
                {
                  level: "System",
                  desc: "Respects prefers-reduced-motion automatically",
                  priority: "Lowest",
                },
                {
                  level: "Context",
                  desc: "IconProvider controls all child icons",
                  priority: "Medium",
                },
                {
                  level: "Component",
                  desc: "animated prop overrides everything",
                  priority: "Highest",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 bg-carbon border border-graphite p-4"
                >
                  <span className="text-xs text-electric uppercase tracking-wider w-24 shrink-0">
                    {item.level}
                  </span>
                  <span className="text-sm text-silver flex-1">
                    {item.desc}
                  </span>
                  <span className="text-xs text-steel">{item.priority}</span>
                </div>
              ))}
            </div>

            <CodeBlock code={providerCode} section="provider" />
          </section>

          <div className="divider my-12" />

          {/* Accessibility */}
          <section id="accessibility" className="mb-16 scroll-mt-24">
            <h2 className="font-display text-2xl font-bold text-bone mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-graphite flex items-center justify-center text-sm text-electric">
                7
              </span>
              Accessibility
            </h2>
            <p className="text-silver mb-6">
              Icons are decorative by default (
              <code className="text-electric">aria-hidden="true"</code>). Add
              meaning with the <code className="text-electric">aria-label</code>{" "}
              prop:
            </p>
            <CodeBlock code={accessibilityCode} section="a11y" />

            <div className="mt-8 grid sm:grid-cols-2 gap-4">
              <div className="bg-carbon border border-graphite p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Check size={18} className="text-electric" />
                  <span className="text-sm font-semibold text-bone">
                    Reduced Motion
                  </span>
                </div>
                <p className="text-xs text-silver">
                  Animations disable automatically when prefers-reduced-motion
                  is set
                </p>
              </div>
              <div className="bg-carbon border border-graphite p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Check size={18} className="text-electric" />
                  <span className="text-sm font-semibold text-bone">
                    Screen Readers
                  </span>
                </div>
                <p className="text-xs text-silver">
                  Use aria-label for meaningful icons, omit for decorative
                </p>
              </div>
            </div>
          </section>

          <div className="divider my-12" />

          {/* API Reference */}
          <section id="api" className="mb-16 scroll-mt-24">
            <h2 className="font-display text-2xl font-bold text-bone mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-graphite flex items-center justify-center text-sm text-electric">
                8
              </span>
              API Reference
            </h2>

            <h3 className="font-display font-semibold text-bone mb-4 mt-8">
              Icon Props
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-graphite">
                    <th className="text-left py-3 px-4 text-silver font-medium">
                      Prop
                    </th>
                    <th className="text-left py-3 px-4 text-silver font-medium">
                      Type
                    </th>
                    <th className="text-left py-3 px-4 text-silver font-medium">
                      Default
                    </th>
                    <th className="text-left py-3 px-4 text-silver font-medium hidden sm:table-cell">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody className="text-ghost">
                  <tr className="border-b border-graphite/50">
                    <td className="py-3 px-4 text-electric">size</td>
                    <td className="py-3 px-4">number</td>
                    <td className="py-3 px-4">24</td>
                    <td className="py-3 px-4 hidden sm:table-cell text-silver">
                      Icon size in pixels
                    </td>
                  </tr>
                  <tr className="border-b border-graphite/50">
                    <td className="py-3 px-4 text-electric">strokeWidth</td>
                    <td className="py-3 px-4">number</td>
                    <td className="py-3 px-4">2</td>
                    <td className="py-3 px-4 hidden sm:table-cell text-silver">
                      SVG stroke width
                    </td>
                  </tr>
                  <tr className="border-b border-graphite/50">
                    <td className="py-3 px-4 text-electric">lively</td>
                    <td className="py-3 px-4 text-xs">LivelyType</td>
                    <td className="py-3 px-4">"scale"</td>
                    <td className="py-3 px-4 hidden sm:table-cell text-silver">
                      Animation style
                    </td>
                  </tr>
                  <tr className="border-b border-graphite/50">
                    <td className="py-3 px-4 text-electric">trigger</td>
                    <td className="py-3 px-4 text-xs">TriggerType</td>
                    <td className="py-3 px-4">"hover"</td>
                    <td className="py-3 px-4 hidden sm:table-cell text-silver">
                      When to animate
                    </td>
                  </tr>
                  <tr className="border-b border-graphite/50">
                    <td className="py-3 px-4 text-electric">animated</td>
                    <td className="py-3 px-4">boolean</td>
                    <td className="py-3 px-4">undefined</td>
                    <td className="py-3 px-4 hidden sm:table-cell text-silver">
                      Override animation state
                    </td>
                  </tr>
                  <tr className="border-b border-graphite/50">
                    <td className="py-3 px-4 text-electric">className</td>
                    <td className="py-3 px-4">string</td>
                    <td className="py-3 px-4">undefined</td>
                    <td className="py-3 px-4 hidden sm:table-cell text-silver">
                      CSS classes
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-electric">aria-label</td>
                    <td className="py-3 px-4">string</td>
                    <td className="py-3 px-4">undefined</td>
                    <td className="py-3 px-4 hidden sm:table-cell text-silver">
                      Accessible label
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="font-display font-semibold text-bone mb-4 mt-10">
              LivelyType
            </h3>
            <div className="bg-carbon border border-graphite p-4">
              <code className="text-sm text-ghost">
                "scale" | "rotate" | "translate" | "shake" | "pulse" | "bounce"
                | "draw" | "spin" | "none"
              </code>
            </div>

            <h3 className="font-display font-semibold text-bone mb-4 mt-8">
              TriggerType
            </h3>
            <div className="bg-carbon border border-graphite p-4">
              <code className="text-sm text-ghost">
                "hover" | "loop" | "mount" | "inView"
              </code>
            </div>

            <h3 className="font-display font-semibold text-bone mb-4 mt-10">
              IconProvider Props
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-graphite">
                    <th className="text-left py-3 px-4 text-silver font-medium">
                      Prop
                    </th>
                    <th className="text-left py-3 px-4 text-silver font-medium">
                      Type
                    </th>
                    <th className="text-left py-3 px-4 text-silver font-medium">
                      Default
                    </th>
                  </tr>
                </thead>
                <tbody className="text-ghost">
                  <tr className="border-b border-graphite/50">
                    <td className="py-3 px-4 text-electric">config.animated</td>
                    <td className="py-3 px-4">boolean</td>
                    <td className="py-3 px-4">true</td>
                  </tr>
                  <tr className="border-b border-graphite/50">
                    <td className="py-3 px-4 text-electric">
                      config.defaultSize
                    </td>
                    <td className="py-3 px-4">number</td>
                    <td className="py-3 px-4">24</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-electric">
                      config.defaultStrokeWidth
                    </td>
                    <td className="py-3 px-4">number</td>
                    <td className="py-3 px-4">2</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="font-display font-semibold text-bone mb-4 mt-10">
              Available Icons
            </h3>
            <p className="text-silver mb-4">
              350+ icons available.{" "}
              <Link href="/icons" className="text-electric hover:underline">
                Browse all icons →
              </Link>
            </p>
          </section>

          <div className="divider my-12" />

          {/* Migration Guide */}
          <section id="migration" className="mb-16 scroll-mt-24">
            <h2 className="font-display text-2xl font-bold text-bone mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-graphite flex items-center justify-center text-sm text-electric">
                9
              </span>
              Migration Guide
            </h2>
            <p className="text-silver mb-6">
              Migrating from another icon library? LivelyIcons is designed to be
              a drop-in replacement with minimal changes required.
            </p>

            {/* Feature Comparison */}
            <div className="mb-10">
              <h3 className="font-display font-semibold text-bone mb-4">
                Feature Comparison
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-graphite">
                      <th className="text-left py-3 px-4 text-silver font-medium">
                        Feature
                      </th>
                      <th className="text-center py-3 px-4 text-silver font-medium">
                        LivelyIcons
                      </th>
                      <th className="text-center py-3 px-4 text-silver font-medium">
                        Lucide
                      </th>
                      <th className="text-center py-3 px-4 text-silver font-medium">
                        Heroicons
                      </th>
                      <th className="text-center py-3 px-4 text-silver font-medium hidden sm:table-cell">
                        React Icons
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-ghost">
                    <tr className="border-b border-graphite/50">
                      <td className="py-3 px-4">Built-in Animations</td>
                      <td className="py-3 px-4 text-center">
                        <Check size={16} className="text-electric mx-auto" />
                      </td>
                      <td className="py-3 px-4 text-center">
                        <X size={16} className="text-steel mx-auto" />
                      </td>
                      <td className="py-3 px-4 text-center">
                        <X size={16} className="text-steel mx-auto" />
                      </td>
                      <td className="py-3 px-4 text-center hidden sm:table-cell">
                        <X size={16} className="text-steel mx-auto" />
                      </td>
                    </tr>
                    <tr className="border-b border-graphite/50">
                      <td className="py-3 px-4">9 Motion Types</td>
                      <td className="py-3 px-4 text-center">
                        <Check size={16} className="text-electric mx-auto" />
                      </td>
                      <td className="py-3 px-4 text-center">
                        <X size={16} className="text-steel mx-auto" />
                      </td>
                      <td className="py-3 px-4 text-center">
                        <X size={16} className="text-steel mx-auto" />
                      </td>
                      <td className="py-3 px-4 text-center hidden sm:table-cell">
                        <X size={16} className="text-steel mx-auto" />
                      </td>
                    </tr>
                    <tr className="border-b border-graphite/50">
                      <td className="py-3 px-4">Trigger Modes</td>
                      <td className="py-3 px-4 text-center">
                        <Check size={16} className="text-electric mx-auto" />
                      </td>
                      <td className="py-3 px-4 text-center">
                        <X size={16} className="text-steel mx-auto" />
                      </td>
                      <td className="py-3 px-4 text-center">
                        <X size={16} className="text-steel mx-auto" />
                      </td>
                      <td className="py-3 px-4 text-center hidden sm:table-cell">
                        <X size={16} className="text-steel mx-auto" />
                      </td>
                    </tr>
                    <tr className="border-b border-graphite/50">
                      <td className="py-3 px-4">Context Provider</td>
                      <td className="py-3 px-4 text-center">
                        <Check size={16} className="text-electric mx-auto" />
                      </td>
                      <td className="py-3 px-4 text-center">
                        <X size={16} className="text-steel mx-auto" />
                      </td>
                      <td className="py-3 px-4 text-center">
                        <X size={16} className="text-steel mx-auto" />
                      </td>
                      <td className="py-3 px-4 text-center hidden sm:table-cell">
                        <Check size={16} className="text-electric mx-auto" />
                      </td>
                    </tr>
                    <tr className="border-b border-graphite/50">
                      <td className="py-3 px-4">Reduced Motion Support</td>
                      <td className="py-3 px-4 text-center">
                        <Check size={16} className="text-electric mx-auto" />
                      </td>
                      <td className="py-3 px-4 text-center text-silver">N/A</td>
                      <td className="py-3 px-4 text-center text-silver">N/A</td>
                      <td className="py-3 px-4 text-center hidden sm:table-cell text-silver">
                        N/A
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4">Tree Shakeable</td>
                      <td className="py-3 px-4 text-center">
                        <Check size={16} className="text-electric mx-auto" />
                      </td>
                      <td className="py-3 px-4 text-center">
                        <Check size={16} className="text-electric mx-auto" />
                      </td>
                      <td className="py-3 px-4 text-center">
                        <Check size={16} className="text-electric mx-auto" />
                      </td>
                      <td className="py-3 px-4 text-center hidden sm:table-cell">
                        <Check size={16} className="text-electric mx-auto" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Lucide Migration */}
            <div className="mb-8">
              <h3 className="font-display font-semibold text-bone mb-4 flex items-center gap-2">
                <span className="tag tag-electric text-xs">Lucide React</span>
                Near-identical API
              </h3>
              <p className="text-sm text-silver mb-4">
                LivelyIcons shares the same API as Lucide React. Change your
                imports and enjoy animations.
              </p>
              <CodeBlock code={migrateLucideCode} section="migrate-lucide" />
            </div>

            {/* Heroicons Migration */}
            <div className="mb-8">
              <h3 className="font-display font-semibold text-bone mb-4 flex items-center gap-2">
                <span className="tag tag-electric text-xs">Heroicons</span>
                Size prop conversion
              </h3>
              <p className="text-sm text-silver mb-4">
                Replace Tailwind size classes with the{" "}
                <code className="text-electric">size</code> prop.
              </p>
              <CodeBlock
                code={migrateHeroiconsCode}
                section="migrate-heroicons"
              />
            </div>

            {/* React Icons Migration */}
            <div className="mb-8">
              <h3 className="font-display font-semibold text-bone mb-4 flex items-center gap-2">
                <span className="tag tag-electric text-xs">React Icons</span>
                Single import source
              </h3>
              <p className="text-sm text-silver mb-4">
                No more importing from different icon packs. All icons from one
                source.
              </p>
              <CodeBlock
                code={migrateReactIconsCode}
                section="migrate-reacticons"
              />
            </div>

            {/* Feather Icons Migration */}
            <div className="mb-8">
              <h3 className="font-display font-semibold text-bone mb-4 flex items-center gap-2">
                <span className="tag tag-electric text-xs">Feather Icons</span>
                Almost identical
              </h3>
              <p className="text-sm text-silver mb-4">
                Same prop names, same API. Just swap the import and add
                animations.
              </p>
              <CodeBlock code={migrateFeatherCode} section="migrate-feather" />
            </div>

            <div className="bg-carbon border border-graphite p-6">
              <h4 className="font-display font-semibold text-bone mb-3">
                Migration Checklist
              </h4>
              <ul className="space-y-2 text-sm text-silver">
                <li className="flex items-start gap-3">
                  <Check size={16} className="text-electric mt-0.5 shrink-0" />
                  <span>
                    Update import statements to use{" "}
                    <code className="text-electric">livelyicons</code>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check size={16} className="text-electric mt-0.5 shrink-0" />
                  <span>
                    Replace <code className="text-electric">color</code> prop
                    with <code className="text-electric">className</code>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check size={16} className="text-electric mt-0.5 shrink-0" />
                  <span>
                    Convert Tailwind size classes to{" "}
                    <code className="text-electric">size</code> prop
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check size={16} className="text-electric mt-0.5 shrink-0" />
                  <span>
                    Add <code className="text-electric">lively</code> and{" "}
                    <code className="text-electric">trigger</code> for
                    animations
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check size={16} className="text-electric mt-0.5 shrink-0" />
                  <span>
                    Wrap app in{" "}
                    <code className="text-electric">IconProvider</code> for
                    global config (optional)
                  </span>
                </li>
              </ul>
            </div>
          </section>

          <div className="divider my-12" />

          {/* Framework Examples */}
          <section id="frameworks" className="mb-16 scroll-mt-24">
            <h2 className="font-display text-2xl font-bold text-bone mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-graphite flex items-center justify-center text-sm text-electric">
                10
              </span>
              Framework Examples
            </h2>
            <p className="text-silver mb-6">
              LivelyIcons works with any React framework. Here are setup
              patterns for popular choices.
            </p>

            {/* Next.js App Router */}
            <div className="mb-10">
              <h3 className="font-display font-semibold text-bone mb-4 flex items-center gap-2">
                <span className="tag tag-electric text-xs">Next.js</span>
                App Router (React Server Components)
              </h3>
              <div className="bg-carbon border border-graphite p-4 mb-4">
                <p className="text-sm text-silver">
                  <strong className="text-bone">Key insight:</strong> Use{" "}
                  <code className="text-electric">
                    animated=&#123;false&#125;
                  </code>{" "}
                  in Server Components for static icons. Wrap interactive icons
                  in Client Components with{" "}
                  <code className="text-electric">&apos;use client&apos;</code>.
                </p>
              </div>
              <CodeBlock code={nextAppRouterCode} section="next-app" />
            </div>

            {/* Next.js Pages Router */}
            <div className="mb-10">
              <h3 className="font-display font-semibold text-bone mb-4 flex items-center gap-2">
                <span className="tag tag-electric text-xs">Next.js</span>
                Pages Router
              </h3>
              <p className="text-sm text-silver mb-4">
                Standard client-side rendering. Wrap with{" "}
                <code className="text-electric">IconProvider</code> in{" "}
                <code className="text-electric">_app.tsx</code>.
              </p>
              <CodeBlock code={nextPagesRouterCode} section="next-pages" />
            </div>

            {/* Remix */}
            <div className="mb-10">
              <h3 className="font-display font-semibold text-bone mb-4 flex items-center gap-2">
                <span className="tag tag-electric text-xs">Remix</span>
                Full-stack React
              </h3>
              <p className="text-sm text-silver mb-4">
                Add <code className="text-electric">IconProvider</code> in your
                root layout for app-wide configuration.
              </p>
              <CodeBlock code={remixCode} section="remix" />
            </div>

            {/* Astro */}
            <div className="mb-10">
              <h3 className="font-display font-semibold text-bone mb-4 flex items-center gap-2">
                <span className="tag tag-electric text-xs">Astro</span>
                Island Architecture
              </h3>
              <div className="bg-carbon border border-graphite p-4 mb-4">
                <p className="text-sm text-silver">
                  <strong className="text-bone">Key insight:</strong> Use{" "}
                  <code className="text-electric">client:load</code> directive
                  for interactive icons. Static icons can render without
                  JavaScript.
                </p>
              </div>
              <CodeBlock code={astroCode} section="astro" />
            </div>

            {/* Vite */}
            <div className="mb-10">
              <h3 className="font-display font-semibold text-bone mb-4 flex items-center gap-2">
                <span className="tag tag-electric text-xs">Vite</span>
                React SPA
              </h3>
              <p className="text-sm text-silver mb-4">
                Standard React setup. Add{" "}
                <code className="text-electric">IconProvider</code> at the root.
              </p>
              <CodeBlock code={viteCode} section="vite" />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-carbon border border-graphite p-4">
                <h4 className="text-sm font-semibold text-bone mb-2">
                  SSR Frameworks
                </h4>
                <p className="text-xs text-silver">
                  Next.js, Remix, Astro - Use{" "}
                  <code className="text-electric">
                    animated=&#123;false&#125;
                  </code>{" "}
                  for server-rendered icons
                </p>
              </div>
              <div className="bg-carbon border border-graphite p-4">
                <h4 className="text-sm font-semibold text-bone mb-2">
                  SPA Frameworks
                </h4>
                <p className="text-xs text-silver">
                  Vite, Create React App - Full animation support out of the box
                </p>
              </div>
            </div>
          </section>

          <div className="divider my-12" />

          {/* Performance Best Practices */}
          <section id="performance" className="mb-16 scroll-mt-24">
            <h2 className="font-display text-2xl font-bold text-bone mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-graphite flex items-center justify-center text-sm text-electric">
                11
              </span>
              Performance Best Practices
            </h2>
            <p className="text-silver mb-6">
              Optimize bundle size and runtime performance with these
              strategies.
            </p>

            {/* Bundle Size */}
            <div className="mb-10">
              <h3 className="font-display font-semibold text-bone mb-4">
                Bundle Size Optimization
              </h3>
              <div className="bg-carbon border border-graphite p-4 mb-4">
                <p className="text-sm text-silver">
                  <strong className="text-bone">Tree shaking:</strong>{" "}
                  Individual imports only bundle the icons you use. Avoid{" "}
                  <code className="text-electric">import *</code> in production
                  builds.
                </p>
              </div>
              <CodeBlock code={bundleOptimizationCode} section="bundle" />

              <div className="mt-6 grid sm:grid-cols-3 gap-4">
                <div className="bg-carbon border border-graphite p-4 text-center">
                  <div className="text-2xl font-bold text-electric mb-1">
                    ~1KB
                  </div>
                  <div className="text-xs text-silver">Per icon (gzipped)</div>
                </div>
                <div className="bg-carbon border border-graphite p-4 text-center">
                  <div className="text-2xl font-bold text-electric mb-1">
                    ~8KB
                  </div>
                  <div className="text-xs text-silver">
                    Motion runtime (shared)
                  </div>
                </div>
                <div className="bg-carbon border border-graphite p-4 text-center">
                  <div className="text-2xl font-bold text-bone mb-1">350+</div>
                  <div className="text-xs text-silver">Icons available</div>
                </div>
              </div>
            </div>

            {/* Static vs Animated */}
            <div className="mb-10">
              <h3 className="font-display font-semibold text-bone mb-4">
                When to Use Static vs Animated Icons
              </h3>
              <p className="text-sm text-silver mb-4">
                Not every icon needs animation. Use animations purposefully for
                better UX.
              </p>
              <CodeBlock
                code={staticVsAnimatedCode}
                section="static-animated"
              />

              <div className="mt-6 grid sm:grid-cols-2 gap-4">
                <div className="bg-carbon border border-graphite p-4">
                  <h4 className="text-sm font-semibold text-bone mb-3 flex items-center gap-2">
                    <Star size={16} className="text-steel" />
                    Static Icons
                  </h4>
                  <ul className="space-y-1 text-xs text-silver">
                    <li>Navigation menus</li>
                    <li>Data tables with icons</li>
                    <li>Lists with many items</li>
                    <li>Server-rendered content</li>
                  </ul>
                </div>
                <div className="bg-carbon border border-graphite p-4">
                  <h4 className="text-sm font-semibold text-bone mb-3 flex items-center gap-2">
                    <Heart size={16} lively="pulse" className="text-electric" />
                    Animated Icons
                  </h4>
                  <ul className="space-y-1 text-xs text-silver">
                    <li>Call-to-action buttons</li>
                    <li>Loading states</li>
                    <li>Success/error feedback</li>
                    <li>Interactive elements</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Reduced Motion */}
            <div className="mb-10">
              <h3 className="font-display font-semibold text-bone mb-4">
                Reducing Motion for Accessibility
              </h3>
              <p className="text-sm text-silver mb-4">
                MotionIcons automatically respects{" "}
                <code className="text-electric">prefers-reduced-motion</code>.
                You can also control it manually.
              </p>
              <CodeBlock code={reducedMotionCode} section="reduced-motion" />

              <div className="mt-6 bg-carbon border border-graphite p-4">
                <div className="flex items-start gap-3">
                  <Check size={18} className="text-electric mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm text-bone font-semibold mb-1">
                      Automatic Detection
                    </p>
                    <p className="text-xs text-silver">
                      When users have{" "}
                      <code className="text-electric">
                        prefers-reduced-motion: reduce
                      </code>{" "}
                      enabled in their OS settings, all animations are
                      automatically disabled without any code changes.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Lazy Loading */}
            <div className="mb-10">
              <h3 className="font-display font-semibold text-bone mb-4">
                Lazy Loading Strategies
              </h3>
              <p className="text-sm text-silver mb-4">
                Split icon bundles across routes for faster initial page loads.
              </p>
              <CodeBlock code={lazyLoadingCode} section="lazy-loading" />

              <div className="mt-6 grid sm:grid-cols-2 gap-4">
                <div className="bg-carbon border border-graphite p-4">
                  <h4 className="text-sm font-semibold text-bone mb-2">
                    Route-based Splitting
                  </h4>
                  <p className="text-xs text-silver">
                    Icons in dynamically imported route components are
                    automatically code-split by bundlers.
                  </p>
                </div>
                <div className="bg-carbon border border-graphite p-4">
                  <h4 className="text-sm font-semibold text-bone mb-2">
                    Component-based Splitting
                  </h4>
                  <p className="text-xs text-silver">
                    Use <code className="text-electric">React.lazy()</code> for
                    icons in modals, drawers, or below-fold content.
                  </p>
                </div>
              </div>
            </div>

            {/* Performance Summary */}
            <div className="bg-carbon border border-graphite p-6">
              <h4 className="font-display font-semibold text-bone mb-4">
                Performance Checklist
              </h4>
              <div className="grid sm:grid-cols-2 gap-4">
                <ul className="space-y-2 text-sm text-silver">
                  <li className="flex items-start gap-3">
                    <Check
                      size={16}
                      className="text-electric mt-0.5 shrink-0"
                    />
                    <span>Use individual imports, not namespace</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check
                      size={16}
                      className="text-electric mt-0.5 shrink-0"
                    />
                    <span>
                      Set{" "}
                      <code className="text-electric">
                        animated=&#123;false&#125;
                      </code>{" "}
                      for static icons
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check
                      size={16}
                      className="text-electric mt-0.5 shrink-0"
                    />
                    <span>
                      Use{" "}
                      <code className="text-electric">
                        trigger=&quot;hover&quot;
                      </code>{" "}
                      over{" "}
                      <code className="text-electric">
                        trigger=&quot;loop&quot;
                      </code>
                    </span>
                  </li>
                </ul>
                <ul className="space-y-2 text-sm text-silver">
                  <li className="flex items-start gap-3">
                    <Check
                      size={16}
                      className="text-electric mt-0.5 shrink-0"
                    />
                    <span>Lazy load icons in modals/drawers</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check
                      size={16}
                      className="text-electric mt-0.5 shrink-0"
                    />
                    <span>
                      Use <code className="text-electric">inView</code> trigger
                      for long pages
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check
                      size={16}
                      className="text-electric mt-0.5 shrink-0"
                    />
                    <span>Test with reduced motion enabled</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <div className="divider my-12" />

          {/* Next.js App Router */}
          <section id="nextjs-app-router" className="mb-16 scroll-mt-24">
            <h2 className="font-display text-2xl font-bold text-bone mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-graphite flex items-center justify-center text-sm text-electric">
                12
              </span>
              Next.js App Router
            </h2>
            <p className="text-silver mb-6">
              LivelyIcons provides multiple approaches for Next.js App Router
              with React Server Components (RSC). Choose the right approach
              based on your needs.
            </p>

            {/* Import Paths Reference Table */}
            <div className="mb-10">
              <h3 className="font-display font-semibold text-bone mb-4">
                Import Paths Quick Reference
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-graphite">
                      <th className="text-left py-3 px-4 text-silver font-medium">
                        Approach
                      </th>
                      <th className="text-left py-3 px-4 text-silver font-medium">
                        Import Path
                      </th>
                      <th className="text-left py-3 px-4 text-silver font-medium hidden sm:table-cell">
                        Use Case
                      </th>
                      <th className="text-center py-3 px-4 text-silver font-medium">
                        Client JS
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-ghost">
                    <tr className="border-b border-graphite/50">
                      <td className="py-3 px-4">
                        <span className="tag tag-electric text-xs">
                          Animated
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <code className="text-electric">livelyicons</code>
                      </td>
                      <td className="py-3 px-4 hidden sm:table-cell text-silver">
                        Interactive UI, hover effects
                      </td>
                      <td className="py-3 px-4 text-center">
                        <Check size={16} className="text-electric mx-auto" />
                      </td>
                    </tr>
                    <tr className="border-b border-graphite/50">
                      <td className="py-3 px-4">
                        <span className="tag text-xs">Static</span>
                      </td>
                      <td className="py-3 px-4">
                        <code className="text-electric">
                          livelyicons/static
                        </code>
                      </td>
                      <td className="py-3 px-4 hidden sm:table-cell text-silver">
                        Server layouts, navigation
                      </td>
                      <td className="py-3 px-4 text-center">
                        <X size={16} className="text-steel mx-auto" />
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4">
                        <span className="tag text-xs">CSS</span>
                      </td>
                      <td className="py-3 px-4">
                        <code className="text-electric">livelyicons/css</code>
                      </td>
                      <td className="py-3 px-4 hidden sm:table-cell text-silver">
                        Server + CSS animations
                      </td>
                      <td className="py-3 px-4 text-center">
                        <X size={16} className="text-steel mx-auto" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-4 grid sm:grid-cols-3 gap-4">
                <div className="bg-carbon border border-graphite p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="tag tag-electric text-xs">Animated</span>
                  </div>
                  <p className="text-xs text-silver">
                    Full Motion animations. Requires{" "}
                    <code className="text-electric">
                      &apos;use client&apos;
                    </code>{" "}
                    directive.
                  </p>
                </div>
                <div className="bg-carbon border border-graphite p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="tag text-xs">Static</span>
                  </div>
                  <p className="text-xs text-silver">
                    Pure SVG, zero JS. Works in Server Components without any
                    directive.
                  </p>
                </div>
                <div className="bg-carbon border border-graphite p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="tag text-xs">CSS</span>
                  </div>
                  <p className="text-xs text-silver">
                    CSS keyframe animations. RSC-safe with animation support.
                  </p>
                </div>
              </div>
            </div>

            {/* Pattern 1: Static Layout */}
            <div className="mb-10">
              <h3 className="font-display font-semibold text-bone mb-4 flex items-center gap-2">
                <span className="w-6 h-6 bg-electric/20 text-electric flex items-center justify-center text-xs">
                  1
                </span>
                Server Component with Static Icons
              </h3>
              <div className="bg-carbon border border-graphite p-4 mb-4">
                <p className="text-sm text-silver">
                  <strong className="text-bone">Best for:</strong> Navigation,
                  headers, footers, and any server-rendered UI. Zero client-side
                  JavaScript - icons render as pure SVG on the server.
                </p>
              </div>
              <CodeBlock
                code={rscStaticLayoutCode}
                section="rsc-static-layout"
              />
            </div>

            {/* Pattern 2: Client Boundary */}
            <div className="mb-10">
              <h3 className="font-display font-semibold text-bone mb-4 flex items-center gap-2">
                <span className="w-6 h-6 bg-electric/20 text-electric flex items-center justify-center text-xs">
                  2
                </span>
                Client Component Boundary
              </h3>
              <div className="bg-carbon border border-graphite p-4 mb-4">
                <p className="text-sm text-silver">
                  <strong className="text-bone">Best for:</strong> Interactive
                  icons that need hover effects, state changes, or Motion
                  animations. Create a small client component wrapper for
                  interactive icons.
                </p>
              </div>
              <CodeBlock
                code={rscClientBoundaryCode}
                section="rsc-client-boundary"
              />
            </div>

            {/* Pattern 3: CSS Animation */}
            <div className="mb-10">
              <h3 className="font-display font-semibold text-bone mb-4 flex items-center gap-2">
                <span className="w-6 h-6 bg-electric/20 text-electric flex items-center justify-center text-xs">
                  3
                </span>
                CSS Animation Alternative
              </h3>
              <div className="bg-carbon border border-graphite p-4 mb-4">
                <p className="text-sm text-silver">
                  <strong className="text-bone">Best for:</strong> When you need
                  animations but want to avoid client JavaScript entirely. Use
                  CSS classes with static icons for RSC-safe animations.
                </p>
              </div>
              <CodeBlock
                code={rscCssAnimationCode}
                section="rsc-css-animation"
              />

              <div className="mt-6">
                <h4 className="text-sm font-semibold text-bone mb-3">
                  Available CSS Animation Classes
                </h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    "motionicon-scale",
                    "motionicon-rotate",
                    "motionicon-pulse",
                    "motionicon-bounce",
                    "motionicon-shake",
                    "motionicon-spin",
                    "motionicon-draw",
                  ].map((cls) => (
                    <code
                      key={cls}
                      className="text-xs bg-carbon border border-graphite px-2 py-1 text-electric"
                    >
                      {cls}
                    </code>
                  ))}
                </div>
              </div>
            </div>

            {/* Pattern 4: Hybrid */}
            <div className="mb-10">
              <h3 className="font-display font-semibold text-bone mb-4 flex items-center gap-2">
                <span className="w-6 h-6 bg-electric/20 text-electric flex items-center justify-center text-xs">
                  4
                </span>
                Hybrid Pattern (Static Layout + Animated Content)
              </h3>
              <div className="bg-carbon border border-graphite p-4 mb-4">
                <p className="text-sm text-silver">
                  <strong className="text-bone">Best for:</strong> Real-world
                  apps that need both fast server rendering and interactive
                  elements. Use static icons in layouts, animated icons in
                  specific client components.
                </p>
              </div>
              <CodeBlock code={rscHybridPatternCode} section="rsc-hybrid" />
            </div>

            {/* Pattern 5: Suspense */}
            <div className="mb-10">
              <h3 className="font-display font-semibold text-bone mb-4 flex items-center gap-2">
                <span className="w-6 h-6 bg-electric/20 text-electric flex items-center justify-center text-xs">
                  5
                </span>
                Lazy Loading with Suspense Fallback
              </h3>
              <div className="bg-carbon border border-graphite p-4 mb-4">
                <p className="text-sm text-silver">
                  <strong className="text-bone">Best for:</strong> Progressive
                  enhancement where animated icons load after initial render.
                  Use static icons as Suspense fallbacks for seamless loading
                  states.
                </p>
              </div>
              <CodeBlock
                code={rscSuspenseFallbackCode}
                section="rsc-suspense"
              />
            </div>

            {/* Decision Guide */}
            <div className="bg-carbon border border-graphite p-6">
              <h4 className="font-display font-semibold text-bone mb-4">
                Which Approach Should I Use?
              </h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Check size={16} className="text-electric mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm text-bone font-semibold">
                      Use{" "}
                      <code className="text-electric">livelyicons/static</code>{" "}
                      when:
                    </p>
                    <p className="text-xs text-silver mt-1">
                      You want zero client JS, need SSR/SSG, or icons are purely
                      decorative.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check size={16} className="text-electric mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm text-bone font-semibold">
                      Use <code className="text-electric">livelyicons</code>{" "}
                      with{" "}
                      <code className="text-electric">
                        &apos;use client&apos;
                      </code>{" "}
                      when:
                    </p>
                    <p className="text-xs text-silver mt-1">
                      You need hover effects, Motion animations, or interactive
                      state changes.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check size={16} className="text-electric mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm text-bone font-semibold">
                      Use <code className="text-electric">livelyicons/css</code>{" "}
                      when:
                    </p>
                    <p className="text-xs text-silver mt-1">
                      You want RSC compatibility with CSS-based animations
                      (spin, pulse, etc.).
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="divider my-12" />

          {/* shadcn/ui Integration */}
          <section id="shadcn" className="mb-16 scroll-mt-24">
            <h2 className="font-display text-2xl font-bold text-bone mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-graphite flex items-center justify-center text-sm text-electric">
                13
              </span>
              shadcn/ui Integration - Coming Soon
            </h2>
            <p className="text-silver mb-6">
              LivelyIcons provides a shadcn-compatible registry that installs
              icons directly into your project following shadcn conventions. No
              npm package needed - components live in your codebase and are
              fully customizable.
            </p>

            {/* Introduction */}
            <div className="bg-carbon border border-graphite p-6 mb-10">
              <h4 className="font-display font-semibold text-bone mb-3 flex items-center gap-2">
                <Star size={18} className="text-electric" />
                Why Use the shadcn Registry?
              </h4>
              <div className="grid sm:grid-cols-2 gap-4 text-sm text-silver">
                <div className="flex items-start gap-2">
                  <Check size={16} className="text-electric mt-0.5 shrink-0" />
                  <span>Components live in your project - full control</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check size={16} className="text-electric mt-0.5 shrink-0" />
                  <span>No external dependencies to manage</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check size={16} className="text-electric mt-0.5 shrink-0" />
                  <span>Follows shadcn/ui file conventions</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check size={16} className="text-electric mt-0.5 shrink-0" />
                  <span>Works with your existing cn() utility</span>
                </div>
              </div>
            </div>

            {/* 13.1 Quick Reference Table */}
            <div className="mb-10">
              <h3 className="font-display font-semibold text-bone mb-4 flex items-center gap-2">
                <span className="w-6 h-6 bg-electric/20 text-electric flex items-center justify-center text-xs">
                  13.1
                </span>
                Installation Quick Reference
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-graphite">
                      <th className="text-left py-3 px-4 text-silver font-medium">
                        Command
                      </th>
                      <th className="text-left py-3 px-4 text-silver font-medium">
                        What it installs
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-ghost">
                    <tr className="border-b border-graphite/50">
                      <td className="py-3 px-4">
                        <code className="text-electric text-xs break-all">
                          npx shadcn@latest add
                          https://livelyicons.com/r/lively-essentials.json
                        </code>
                      </td>
                      <td className="py-3 px-4 text-silver">
                        Provider, hook, types + popular icons
                      </td>
                    </tr>
                    <tr className="border-b border-graphite/50">
                      <td className="py-3 px-4">
                        <code className="text-electric text-xs break-all">
                          npx shadcn@latest add
                          https://livelyicons.com/r/heart-pulse.json
                        </code>
                      </td>
                      <td className="py-3 px-4 text-silver">
                        Individual icon component
                      </td>
                    </tr>
                    <tr className="border-b border-graphite/50">
                      <td className="py-3 px-4">
                        <code className="text-electric text-xs break-all">
                          npx shadcn@latest add
                          https://livelyicons.com/r/lively-provider.json
                        </code>
                      </td>
                      <td className="py-3 px-4 text-silver">
                        Context provider only
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4">
                        <code className="text-electric text-xs break-all">
                          npx shadcn@latest add
                          https://livelyicons.com/r/lively-types.json
                        </code>
                      </td>
                      <td className="py-3 px-4 text-silver">
                        TypeScript types only
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 13.2 Installing the Essentials Bundle */}
            <div className="mb-10">
              <h3 className="font-display font-semibold text-bone mb-4 flex items-center gap-2">
                <span className="w-6 h-6 bg-electric/20 text-electric flex items-center justify-center text-xs">
                  13.2
                </span>
                Installing the Essentials Bundle
              </h3>
              <p className="text-sm text-silver mb-4">
                The essentials bundle is the fastest way to get started. It
                includes the provider, animation hook, types, and a curated set
                of popular icons.
              </p>
              <CodeBlock
                code={shadcnInstallEssentialsCode}
                section="shadcn-essentials"
              />
            </div>

            {/* 13.3 Installing Individual Icons */}
            <div className="mb-10">
              <h3 className="font-display font-semibold text-bone mb-4 flex items-center gap-2">
                <span className="w-6 h-6 bg-electric/20 text-electric flex items-center justify-center text-xs">
                  13.3
                </span>
                Installing Individual Icons
              </h3>
              <p className="text-sm text-silver mb-4">
                Install only the icons you need for a minimal footprint. Each
                icon is self-contained with its own animation logic.
              </p>
              <CodeBlock
                code={shadcnInstallIndividualCode}
                section="shadcn-individual"
              />
            </div>

            {/* 13.4 Basic Usage */}
            <div className="mb-10">
              <h3 className="font-display font-semibold text-bone mb-4 flex items-center gap-2">
                <span className="w-6 h-6 bg-electric/20 text-electric flex items-center justify-center text-xs">
                  13.4
                </span>
                Using Installed Icons
              </h3>
              <p className="text-sm text-silver mb-4">
                After installation, import icons from your local{" "}
                <code className="text-electric">@/components/icons</code>{" "}
                directory.
              </p>
              <CodeBlock code={shadcnBasicUsageCode} section="shadcn-basic" />
            </div>

            {/* 13.5 Using the LivelyProvider */}
            <div className="mb-10">
              <h3 className="font-display font-semibold text-bone mb-4 flex items-center gap-2">
                <span className="w-6 h-6 bg-electric/20 text-electric flex items-center justify-center text-xs">
                  13.5
                </span>
                Global Configuration with LivelyProvider
              </h3>
              <p className="text-sm text-silver mb-4">
                Wrap your app with{" "}
                <code className="text-electric">LivelyProvider</code> to set
                default values for all icons.
              </p>
              <CodeBlock
                code={shadcnProviderUsageCode}
                section="shadcn-provider"
              />
            </div>

            {/* 13.6 Styling with cn() and Tailwind */}
            <div className="mb-10">
              <h3 className="font-display font-semibold text-bone mb-4 flex items-center gap-2">
                <span className="w-6 h-6 bg-electric/20 text-electric flex items-center justify-center text-xs">
                  13.6
                </span>
                Styling with cn() and Tailwind
              </h3>
              <p className="text-sm text-silver mb-4">
                Icons are fully compatible with Tailwind CSS and the shadcn{" "}
                <code className="text-electric">cn()</code> utility for
                conditional styling.
              </p>
              <CodeBlock
                code={shadcnCustomStylingCode}
                section="shadcn-styling"
              />
            </div>

            {/* 13.7 File Structure */}
            <div className="mb-10">
              <h3 className="font-display font-semibold text-bone mb-4 flex items-center gap-2">
                <span className="w-6 h-6 bg-electric/20 text-electric flex items-center justify-center text-xs">
                  13.7
                </span>
                File Structure After Installation
              </h3>
              <p className="text-sm text-silver mb-4">
                Components are installed following shadcn conventions:
              </p>
              <CodeBlock
                code={shadcnFileStructureCode}
                section="shadcn-structure"
              />
            </div>

            {/* 13.8 Styling Conventions */}
            <div className="mb-10">
              <h3 className="font-display font-semibold text-bone mb-4 flex items-center gap-2">
                <span className="w-6 h-6 bg-electric/20 text-electric flex items-center justify-center text-xs">
                  13.8
                </span>
                Styling Conventions
              </h3>
              <div className="space-y-4">
                <div className="bg-carbon border border-graphite p-4">
                  <h4 className="text-sm font-semibold text-bone mb-2">
                    CSS Variables
                  </h4>
                  <p className="text-xs text-silver mb-3">
                    Icons support optional CSS variable customization:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <code className="text-xs bg-graphite px-2 py-1 text-electric">
                      --lively-icon-size
                    </code>
                    <code className="text-xs bg-graphite px-2 py-1 text-electric">
                      --lively-stroke-width
                    </code>
                  </div>
                </div>
                <div className="bg-carbon border border-graphite p-4">
                  <h4 className="text-sm font-semibold text-bone mb-2">
                    Component Pattern
                  </h4>
                  <p className="text-xs text-silver">
                    All icons use React&apos;s{" "}
                    <code className="text-electric">forwardRef</code> pattern,
                    matching shadcn/ui components. Refs are forwarded to the
                    underlying SVG element.
                  </p>
                </div>
                <div className="bg-carbon border border-graphite p-4">
                  <h4 className="text-sm font-semibold text-bone mb-2">
                    cn() Utility Required
                  </h4>
                  <p className="text-xs text-silver">
                    Your project must have a{" "}
                    <code className="text-electric">cn()</code> utility at{" "}
                    <code className="text-electric">@/lib/utils</code>. This is
                    standard in shadcn/ui projects.
                  </p>
                </div>
              </div>
            </div>

            {/* 13.9 Available Icons */}
            <div className="mb-10">
              <h3 className="font-display font-semibold text-bone mb-4 flex items-center gap-2">
                <span className="w-6 h-6 bg-electric/20 text-electric flex items-center justify-center text-xs">
                  13.9
                </span>
                Available Icons
              </h3>
              <div className="bg-carbon border border-graphite p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-2xl font-bold text-electric">1300+</p>
                    <p className="text-sm text-silver">
                      icons available via registry
                    </p>
                  </div>
                  <Link href="/icons" className="btn-secondary text-sm">
                    Browse Icons
                    <ArrowRight size={16} className="ml-2" />
                  </Link>
                </div>
                <p className="text-xs text-silver">
                  All icons from the LivelyIcons library are available through
                  the shadcn registry. Use the icon browser to find icons by
                  name or category, then install them with the CLI.
                </p>
              </div>
            </div>

            {/* Requirements Callout */}
            <div className="bg-carbon border border-graphite p-6">
              <h4 className="font-display font-semibold text-bone mb-4">
                Requirements
              </h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Check size={16} className="text-electric mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm text-bone font-semibold">
                      Motion library
                    </p>
                    <p className="text-xs text-silver mt-1">
                      Run{" "}
                      <code className="text-electric">npm install motion</code>{" "}
                      or <code className="text-electric">pnpm add motion</code>
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check size={16} className="text-electric mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm text-bone font-semibold">
                      cn() utility
                    </p>
                    <p className="text-xs text-silver mt-1">
                      Your project needs{" "}
                      <code className="text-electric">@/lib/utils</code> with
                      the <code className="text-electric">cn()</code> function
                      (standard in shadcn/ui)
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check size={16} className="text-electric mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm text-bone font-semibold">React 18+</p>
                    <p className="text-xs text-silver mt-1">
                      Icons use modern React features like{" "}
                      <code className="text-electric">forwardRef</code>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <div className="mt-16 bg-carbon border border-graphite p-8 text-center">
            <h3 className="font-display text-xl font-bold text-bone mb-4">
              Ready to explore?
            </h3>
            <Link
              href="/icons"
              className="btn-primary inline-flex items-center gap-2"
            >
              Browse All 1300+ Icons
              <ArrowRight size={18} />
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}
