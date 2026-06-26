# Grooming studio website

[![CI](https://github.com/hu553in/grooming-studio/actions/workflows/ci.yml/badge.svg)](https://github.com/hu553in/grooming-studio/actions/workflows/ci.yml)

Website for [a pet grooming studio](https://пес-ты-вымыт.рф) in Omsk, Russia.

## What it does

- Builds a React and TypeScript SPA with Vite
- Serves static pages, public assets, fonts, icons, sitemap, and robots metadata
- Converts source images in `public/images` to WebP through `pnpm images:webp`
- Publishes a Docker image that serves `dist/spa` through nginx
- Exposes `/healthz` from the nginx image

## Requirements

- Node.js and pnpm for local development
- `xmllint` for SVG checks; CI installs it through `libxml2-utils`
- Docker for image builds

## Setup

```bash
pnpm i
pnpm dev
```

Open <http://localhost:8080>.

## Configuration

| Name                | Required | Description                                                    |
| ------------------- | -------- | -------------------------------------------------------------- |
| `VITE_API_BASE_URL` | No       | Frontend API base URL for local Vite builds                    |
| `API_BASE_URL`      | No       | Docker build arg mapped to `VITE_API_BASE_URL` in the image    |
| `WEBP_QUALITY`      | No       | Image conversion quality for `pnpm images:webp`; default is 82 |
| `WEBP_EFFORT`       | No       | Image conversion effort for `pnpm images:webp`; default is 6   |

## Docker

```bash
docker build --build-arg API_BASE_URL=https://example.com -t grooming-studio .
docker run --rm -p 8080:80 grooming-studio
```

The image uses `nginx.conf`, serves the SPA from `/srv/grooming-studio`, and falls back to
`index.html` for client-side routes.

## Development

```bash
pnpm images:webp
pnpm build
pnpm test
pnpm check
pnpm check:fix
```

## Tech stack

- React, TypeScript
- Tailwind CSS, Vite
- Vitest, ESLint, Prettier, Stylelint
- nginx for the published container image
