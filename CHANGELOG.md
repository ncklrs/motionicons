# Changelog

All notable changes to LivelyIcons will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.1] - 2025-01-03

### Added
- Complete shadcn/ui registry integration with installation support
- CLI tool for icon discovery (`npx livelyicons search`, `list`, `copy`, `info`)
- Mobile-friendly navigation with hamburger menu
- Favicon for demo site
- LivelyIcons brand logo and updated site navigation
- Vercel Web Analytics integration
- Comprehensive documentation overhaul

### Fixed
- Draw animation now works correctly for all trigger modes
- Mobile overflow issues on landing page and docs
- Mobile responsiveness improvements across all pages
- Missing `md:flex` and `md:hidden` responsive classes
- Gap between search icon and input text
- Corrupted icon exports regenerated
- Lively text legibility in logo
- Next.js build type-checking for external packages

### Changed
- Rebranded to LivelyIcons with nature/vine-inspired aesthetic
- Updated favicon with vine logo

## [1.0.0] - 2025-01-02

### Added
- **1300+ animated SVG icons** across multiple categories
- **9 motion types**: scale, rotate, translate, shake, pulse, bounce, draw, spin, none
- **4 trigger modes**: hover, loop, mount, inView
- Full TypeScript support with exported types
- Tree-shakeable ESM and CJS builds
- `IconProvider` for global configuration
- Accessibility features with `prefers-reduced-motion` support
- Static icon exports for React Server Components (`livelyicons/static`)
- CSS animation exports for RSC (`livelyicons/css`)
- Comprehensive README with documentation
- Dark and light mode SVG logos

### Changed
- **BREAKING**: Renamed package from `motionicons` to `livelyicons`
- **BREAKING**: Renamed `motionType` prop to `lively` for cleaner API
