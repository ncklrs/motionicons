<p align="center">
  <img src="public/logo.svg" width="80" alt="LivelyIcons" />
</p>

<h1 align="center">LivelyIcons</h1>

<p align="center">
  A comprehensive library of <strong>1300+ animated SVG icons</strong> powered by <a href="https://motion.dev">Motion</a> for React.<br/>
  Beautiful, customizable icons with built-in animations that bring your UI to life.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/livelyicons">
    <img src="https://img.shields.io/npm/v/livelyicons.svg" alt="npm version" />
  </a>
  <a href="https://bundlephobia.com/package/livelyicons">
    <img src="https://img.shields.io/bundlephobia/minzip/livelyicons" alt="Bundle size" />
  </a>
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="MIT License" />
  </a>
</p>

## Features

- **1300+ Icons** — Comprehensive icon set covering UI, navigation, media, commerce, and more
- **9 Motion Types** — Scale, rotate, translate, shake, pulse, bounce, draw, spin, and none
- **4 Trigger Modes** — Hover, loop, mount, and inView animations
- **Fully Typed** — Complete TypeScript support with exported types
- **Tree Shakeable** — Import only what you need ([see proof](#bundle-size))
- **Customizable** — Control size, stroke width, colors, and animation behavior
- **Context Support** — Global configuration via IconProvider
- **Accessible** — ARIA labels and reduced motion support

## Installation

### Option 1: NPM Package

```bash
npm install livelyicons motion react react-dom
# or
pnpm add livelyicons motion react react-dom
# or
yarn add livelyicons motion react react-dom
```

### Option 2: shadcn/ui Registry (Recommended for shadcn projects) - COMING SOON

Install individual icons or bundles directly into your project:

```bash
# Install the essentials bundle (provider, hook, types, and popular icons)
npx shadcn@latest add https://livelyicons.com/r/lively-essentials.json

# Or install individual icons
npx shadcn@latest add https://livelyicons.com/r/heart-pulse.json
npx shadcn@latest add https://livelyicons.com/r/activity.json

# Install just the animation infrastructure
npx shadcn@latest add https://livelyicons.com/r/lively-provider.json
npx shadcn@latest add https://livelyicons.com/r/use-lively-animation.json
npx shadcn@latest add https://livelyicons.com/r/lively-types.json
```

This installs the components directly into your project following shadcn conventions:
- Icons go to `components/icons/`
- Hooks go to `hooks/`
- Library files go to `lib/`

**Requirements for shadcn installation:**
- Your project must have a `cn()` utility at `@/lib/utils`
- Motion library: `npm install motion`

## Quick Start

### NPM Package Usage

```tsx
import { Heart, Star, Bell } from 'livelyicons'

function App() {
  return (
    <div>
      {/* Scale animation on hover (default) */}
      <Heart size={24} lively="scale" />

      {/* Continuous rotation */}
      <Star size={32} lively="rotate" trigger="loop" />

      {/* Draw animation on hover */}
      <Bell size={24} lively="draw" />
    </div>
  )
}
```

### shadcn Registry Usage - COMING SOON

```tsx
// After installing via shadcn CLI
import { HeartPulse } from "@/components/icons/heart-pulse"
import { Activity } from "@/components/icons/activity"
import { LivelyProvider } from "@/lib/lively-provider"

function App() {
  return (
    <LivelyProvider config={{ animated: true }}>
      {/* Pulse animation on hover */}
      <HeartPulse size={24} lively="pulse" />

      {/* Draw animation */}
      <Activity size={32} lively="draw" trigger="hover" />
    </LivelyProvider>
  )
}
```

## Motion Types

| Type | Description |
|------|-------------|
| `scale` | Grows larger on trigger (default) |
| `rotate` | Rotates 360 degrees |
| `translate` | Moves up slightly |
| `shake` | Shakes horizontally |
| `pulse` | Pulses in size |
| `bounce` | Bounces up and down |
| `draw` | SVG path drawing effect |
| `spin` | Continuous spinning |
| `none` | No animation |

## Trigger Modes

| Trigger | Description |
|---------|-------------|
| `hover` | Animates on mouse hover (default) |
| `loop` | Continuous animation |
| `mount` | Animates once when component mounts |
| `inView` | Animates when scrolled into viewport |

## Props

All icons accept the following props:

```typescript
interface IconProps {
  size?: number              // Icon size in pixels (default: 24)
  strokeWidth?: number       // Stroke width (default: 2)
  className?: string         // Additional CSS classes
  lively?: MotionType        // Animation type
  trigger?: TriggerType      // When to trigger animation
  animated?: boolean         // Enable/disable animations
  'aria-label'?: string      // Accessibility label
}
```

## CLI

LivelyIcons includes a CLI for quick icon discovery:

```bash
# Search for icons by name (fuzzy matching)
npx livelyicons search arrow

# List all available icons
npx livelyicons list

# Copy import statement to clipboard
npx livelyicons copy Heart

# Get icon details
npx livelyicons info Star
```

## Global Configuration

Use `IconProvider` to set defaults for all icons in your app:

```tsx
import { IconProvider, Heart, Star } from 'livelyicons'

function App() {
  return (
    <IconProvider config={{
      animated: true,
      defaultSize: 28,
      defaultStrokeWidth: 1.5
    }}>
      {/* All icons inherit these defaults */}
      <Heart />
      <Star />
    </IconProvider>
  )
}
```

## Accessibility

LivelyIcons respects `prefers-reduced-motion` by default. You can also manually control animations:

```tsx
// Disable animations for this icon
<Heart animated={false} />

// Add accessible label
<Heart aria-label="Favorite" />
```

## Bundle Size

LivelyIcons is fully tree-shakeable. Import only the icons you need and your bundle stays small:

| Import | Bundle Size (gzip) | % of Full |
|--------|-------------------|-----------|
| 1 icon | **1.8 KB** | 2.0% |
| 5 icons | **2.0 KB** | 2.3% |
| 10 icons | **2.3 KB** | 2.6% |
| 25 icons | **3.1 KB** | 3.5% |
| 50 icons | **4.3 KB** | 4.8% |
| 100 icons | **7.2 KB** | 8.1% |
| Full import (\*) | **88.9 KB** | 100% |

> **Tree shaking saves 98% when importing just 1 icon!**

**Static icons (RSC-compatible):**

| Import | Bundle Size (gzip) |
|--------|-------------------|
| 1 static icon | ~2.4 KB |
| 5 static icons | ~2.4 KB |

### Why Tree Shaking Works

1. **ESM Exports** - All icons use ES module named exports
2. **No Side Effects** - `"sideEffects": false` in package.json
3. **Individual Files** - Each icon is in its own file
4. **Code Splitting** - Built with tsup splitting enabled

[Bundlephobia](https://bundlephobia.com/package/livelyicons)

## Next.js App Router (RSC)

LivelyIcons provides three import paths for different Next.js App Router use cases:

| Import Path | Use Case | Client JS |
|-------------|----------|-----------|
| `livelyicons` | Animated icons (requires `'use client'`) | Yes |
| `livelyicons/static` | Server Components, layouts | No |
| `livelyicons/css` | CSS animations in RSC | No |

### Static Icons (Server Components)

```tsx
// app/layout.tsx - No "use client" needed
import { StaticHeart, StaticStar } from 'livelyicons/static';

export default function RootLayout({ children }) {
  return (
    <nav>
      <StaticHeart size={24} className="text-red-500" />
      <StaticStar size={24} />
    </nav>
  );
}
```

### Animated Icons (Client Components)

```tsx
// app/components/LikeButton.tsx
'use client';

import { Heart } from 'livelyicons';

export function LikeButton() {
  return <Heart lively="pulse" trigger="hover" />;
}
```

### CSS Animations (RSC-safe)

```tsx
// app/page.tsx - Server Component with CSS animations
import { StaticLoader } from 'livelyicons/static';

export default function Page() {
  return (
    <StaticLoader
      size={24}
      animationClass="motionicon-spin"
    />
  );
}
```

See the [full documentation](/docs#nextjs-app-router) for more patterns including hybrid layouts and Suspense fallbacks.

## Available Icons

LivelyIcons includes 1300+ icons across categories:

- **Navigation** — Arrows, chevrons, menu, home
- **Actions** — Check, close, edit, save, trash
- **Media** — Play, pause, volume, camera, video
- **Communication** — Mail, phone, message, send
- **Commerce** — Cart, credit card, package, receipt
- **Files** — File, folder, clipboard, archive
- **Weather** — Sun, cloud, rain, snow, wind
- **Health** — Heart, pill, stethoscope, brain
- **Devices** — Laptop, phone, monitor, keyboard
- **And many more...**

## Development

```bash
# Install dependencies
pnpm install

# Start dev server (showcase site)
pnpm dev

# Build library
pnpm run build:lib

# Type check
pnpm run type-check
```

### Building the shadcn Registry

```bash
# Transform icons to shadcn format (default: 8 test icons)
npx tsx scripts/transform-icons.ts

# Transform specific icons
npx tsx scripts/transform-icons.ts heart-pulse activity globe sun

# Transform all icons
npx tsx scripts/transform-icons.ts --all

# Build registry JSON files
npx tsx scripts/build-registry.ts
```

Registry output:
- `registry/icons/` - Transformed icon components
- `registry/lib/` - Types, provider, hook
- `public/r/` - JSON files for shadcn CLI
- `registry/registry.json` - Main manifest

## Tech Stack

- **React 18+** with Motion for animations
- **TypeScript** with strict mode
- **ESM and CJS** builds via tsup
- **Next.js 15** for the showcase site

## License

MIT License - see [LICENSE](LICENSE) for details.
