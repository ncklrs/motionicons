<p align="center">
  <img src="public/logo.svg" width="80" alt="LivelyIcons" />
</p>

<h1 align="center">LivelyIcons</h1>

<p align="center">
  A comprehensive library of <strong>350 animated SVG icons</strong> powered by <a href="https://motion.dev">Motion</a> for React.<br/>
  Beautiful, customizable icons with built-in animations that bring your UI to life.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/livelyicons">
    <img src="https://img.shields.io/npm/v/livelyicons.svg" alt="npm version" />
  </a>
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="MIT License" />
  </a>
</p>

## Features

- **350 Icons** — Comprehensive icon set covering UI, navigation, media, commerce, and more
- **9 Motion Types** — Scale, rotate, translate, shake, pulse, bounce, draw, spin, and none
- **4 Trigger Modes** — Hover, loop, mount, and inView animations
- **Fully Typed** — Complete TypeScript support with exported types
- **Tree Shakeable** — Import only what you need
- **Customizable** — Control size, stroke width, colors, and animation behavior
- **Context Support** — Global configuration via IconProvider
- **Accessible** — ARIA labels and reduced motion support

## Installation

```bash
npm install livelyicons motion react react-dom
# or
pnpm add livelyicons motion react react-dom
# or
yarn add livelyicons motion react react-dom
```

## Quick Start

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

## Available Icons

LivelyIcons includes 350 icons across categories:

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

## Tech Stack

- **React 18+** with Motion for animations
- **TypeScript** with strict mode
- **ESM and CJS** builds via tsup
- **Next.js 15** for the showcase site

## License

MIT License - see [LICENSE](LICENSE) for details.
