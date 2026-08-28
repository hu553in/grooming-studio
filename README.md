# Grooming studio website

[![CI](https://github.com/hu553in/grooming-studio/actions/workflows/ci.yml/badge.svg)](https://github.com/hu553in/grooming-studio/actions/workflows/ci.yml)

Website for [a pet grooming studio](https://пес-ты-вымыт.рф) in Omsk, Russia.

## What it does

- Builds a React and TypeScript SPA with Vite
- Serves static pages, public assets, fonts, icons, sitemap, and robots metadata
- Uses a Vercel SPA fallback so direct route visits resolve to `index.html`

## Requirements

- Bun for local development

## Setup

```bash
bun i
bun dev
```

Open <http://localhost:5173>.

## Runtime behavior

- Vite builds the static site for Vercel
- `vercel.json` first serves existing files, then rewrites unmatched paths to `index.html`

## Development

```bash
bun run build
bun run test
bun check
bun check:fix
```

`bun run build` writes the production build to `dist/`.

## Tech stack

- React, TypeScript
- Tailwind CSS, Vite
- Vitest, ESLint, Prettier, Stylelint, Knip
