# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev               # Dev server at http://localhost:3000
npm run build             # Production build
npm run start             # Serve the production build
npm run lint              # ESLint across the project
npx eslint app/page.tsx   # Lint a single file
npx tsc --noEmit          # Type-check (there is no npm script for this)
npx next typegen          # Generate route types without a dev server or build
```

No test runner is configured, so there is no test command yet.

## Architecture

This is a Next.js 16 App Router project on React 19, still close to the `create-next-app` scaffold: `app/layout.tsx` and `app/page.tsx` are the only routes, and `app/page.tsx` and the metadata in `app/layout.tsx` are template placeholders. There is no `src/` directory, and the `@/*` import alias maps to the repository root.

Some behavior comes from project settings and differs from older Next.js defaults:

- **Cache Components is on** (`cacheComponents` and `partialPrefetching` in `next.config.ts`). Data fetching is dynamic by default, and caching is opted into with `use cache`, `cacheLife` and `cacheTag`. Routes prerender a static shell and stream dynamic content. Do not add a `runtime` route segment export, because Cache Components does not support it. `<Link>` prefetches a per-route App Shell rather than the full page, and client navigation preserves component state through React `<Activity>`.
- **Tailwind CSS v4 runs through Turbopack**, using the `@tailwindcss/turbopack` loader configured for `*.css` in `next.config.ts`. There is no PostCSS or `tailwind.config` file. Theme tokens live in the `@theme inline` block in `app/globals.css`, mapped from the CSS variables in `:root`, which also switch for dark mode.
- **`LayoutProps` and other route types are generated globals**, not imports. They come from `.next/types`, so `tsc` needs `next dev`, `next build` or `next typegen` to have run first on a clean checkout.

## Repository notes

`AGENTS.md` is partly managed by `next dev`, which rewrites the blocks between its `nextjs-agent-*` markers. Do not hand-edit those blocks; put project guidance in this file or outside the markers.
