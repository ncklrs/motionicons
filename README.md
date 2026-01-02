<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/ncklrs/motionicons/main/.github/logo-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/ncklrs/motionicons/main/.github/logo-light.svg">
  <img alt="MotionIcons" src="https://raw.githubusercontent.com/ncklrs/motionicons/main/.github/logo-dark.svg" width="320">
</picture>

# MotionIcons

A comprehensive library of **350 animated SVG icons** powered by [Motion](https://motion.dev) for React. Beautiful, customizable icons with built-in animations that bring your UI to life.

[![npm version](https://img.shields.io/npm/v/motionicon.svg)](https://www.npmjs.com/package/motionicon)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

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
npm install motionicon motion react react-dom
# or
pnpm add motionicon motion react react-dom
# or
yarn add motionicon motion react react-dom
```

## Quick Start

```tsx
import { Heart, Star, Bell } from 'motionicon'

function App() {
  return (
    <div>
      {/* Scale animation on hover (default) */}
      <Heart size={24} motionType="scale" />

      {/* Continuous rotation */}
      <Star size={32} motionType="rotate" trigger="loop" />

      {/* Draw animation on hover */}
      <Bell size={24} motionType="draw" />
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
  motionType?: MotionType    // Animation type
  trigger?: TriggerType      // When to trigger animation
  animated?: boolean         // Enable/disable animations
  'aria-label'?: string      // Accessibility label
}
```

## Global Configuration

Use `IconProvider` to set defaults for all icons in your app:

```tsx
import { IconProvider, Heart, Star } from 'motionicon'

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

MotionIcons respects `prefers-reduced-motion` by default. You can also manually control animations:

```tsx
// Disable animations for this icon
<Heart animated={false} />

// Add accessible label
<Heart aria-label="Favorite" />
```

## Available Icons

MotionIcons includes 350 icons across categories:

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
