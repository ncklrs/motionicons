# MotionIcon Library

A comprehensive library of animated icons powered by Motion for React.

## Project Structure

```
/app
  /docs/page.tsx          - Documentation page
  /icons/page.tsx         - Icons showcase page
  /layout.tsx             - Root layout component
  /page.tsx               - Home page
  /globals.css            - Global styles with Tailwind CSS v4

/src
  /icons/                 - Icon components (to be implemented)
  /context/               - React context providers (to be implemented)
  /hooks/                 - Custom React hooks (to be implemented)
  /lib/                   - Utility functions and libraries (to be implemented)
  /index.ts               - Main entry point for library exports

/registry.json            - Icon registry with metadata
```

## Tech Stack

- **Next.js 15+** - React framework with App Router
- **React 19** - UI library
- **TypeScript 5.7** - Type safety (strict mode enabled)
- **Motion 12** - Animation library
- **Tailwind CSS v4** - Utility-first CSS framework
- **pnpm** - Package manager

## Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Type check
pnpm run type-check

# Build for production
pnpm build

# Start production server
pnpm start
```

## TypeScript Configuration

The project uses strict TypeScript configuration with:
- Strict mode enabled
- No unused locals/parameters
- No implicit returns
- No fallthrough cases in switch statements
- Force consistent casing in filenames

## Next Steps

This is the base infrastructure. Other agents will implement:
1. Icon components
2. Context providers
3. Custom hooks
4. Utility functions
5. Page content and documentation
