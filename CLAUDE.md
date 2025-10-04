# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

HookHub is a Next.js 15 application using React 19, TypeScript, and Tailwind CSS v4. The project uses Turbopack for faster builds and development.

## Development Commands

```bash
# Development server with Turbopack
npm run dev

# Production build with Turbopack
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

## Project Structure

This is a Next.js App Router project:

- **src/app/**: App Router directory containing pages and layouts
  - `layout.tsx`: Root layout with Geist font configuration
  - `page.tsx`: Home page component
  - `globals.css`: Global styles with Tailwind directives
- **public/**: Static assets (SVG icons, images)
- **tsconfig.json**: TypeScript configuration with path alias `@/*` mapping to `./src/*`

## Key Configuration

- **Next.js**: Version 15.5.4 with Turbopack enabled
- **React**: Version 19.1.0
- **TypeScript**: Strict mode enabled
- **Tailwind CSS**: Version 4 with PostCSS plugin (`@tailwindcss/postcss`)
- **ESLint**: Uses `next/core-web-vitals` and `next/typescript` configs
- **Path Alias**: `@/*` resolves to `src/*`

## Styling

The project uses Tailwind CSS v4 configured via PostCSS. Global styles are in `src/app/globals.css` with custom CSS variables for theming (light/dark mode support).

## Font Loading

Uses `next/font/google` to load Geist Sans and Geist Mono fonts with Latin subset, exposed as CSS variables (`--font-geist-sans`, `--font-geist-mono`).
