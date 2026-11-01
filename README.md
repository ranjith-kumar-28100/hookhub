# HookHub

A browsable gallery of open source [Claude Code hooks](https://code.claude.com/docs/en/hooks). Hooks are scattered across GitHub repositories and general lists, so HookHub puts them in one grid with a name, category, description and a link to each repo.

The MVP only displays hooks. Search, filtering, detail pages and submissions are not built yet. See the [MVP spec](memory/spec/CLAUDE.md) for scope and plans.

## Getting started

Requires Node.js and npm.

```bash
npm install
npm run dev     # http://localhost:3000
```

Other commands:

```bash
npm run build           # production build
npm run start           # serve the production build
npm run lint            # ESLint
npx tsc --noEmit        # type-check
```

## Adding a hook

Hooks are a hand-curated list in [`data/hooks.ts`](data/hooks.ts). To add one, append an entry:

```ts
{
  id: "my-hook",                 // unique kebab-case slug
  name: "my-hook",
  category: "Safety",            // one of the HookCategory values
  description: "One sentence, plain text, under about 140 characters.",
  repoUrl: "https://github.com/owner/repo",
},
```

Before adding an entry:

- The repository must exist, be public, and have a recognised open source license.
- Each entry is one repository, even if it contains several hooks.
- Write the description from the repository's README, not from memory.
- Pick one category: Security, Safety, Code Quality, Monitoring, Context & Memory, Notifications, Git or Tooling.

TypeScript rejects an invalid category, so run `npx tsc --noEmit` after editing.

## Stack

Next.js 16 (App Router), React 19, TypeScript and Tailwind CSS v4. The page is a Server Component and prerenders as static content.

Next.js 16 differs from older versions, so check the docs in `node_modules/next/dist/docs/` before changing framework-level code.
