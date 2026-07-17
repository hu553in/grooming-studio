# Grooming studio website

[![CI](https://github.com/hu553in/grooming-studio/actions/workflows/ci.yml/badge.svg)](https://github.com/hu553in/grooming-studio/actions/workflows/ci.yml)

Website for [a pet grooming studio](https://пес-ты-вымыт.рф) in Omsk, Russia.

## What it does

- Builds a React and TypeScript SPA with Vite
- Serves static pages, public assets, fonts, icons, sitemap, and robots metadata
- Publishes a Docker image that serves `dist/spa` through nginx
- Exposes `/healthz` from the nginx image

## Requirements

- Bun 1.3.14 for local development
- Docker for image builds

## Setup

```bash
bun i
bun dev
```

Open <http://localhost:8080>.

## Configuration

| Name                | Required | Description                                                 |
| ------------------- | -------- | ----------------------------------------------------------- |
| `VITE_API_BASE_URL` | No       | Frontend API base URL for local Vite builds                 |
| `API_BASE_URL`      | No       | Docker build arg mapped to `VITE_API_BASE_URL` in the image |

## Docker

```bash
docker build --build-arg API_BASE_URL=https://example.com -t grooming-studio .
docker run --rm -p 8080:8080 grooming-studio
```

CI publishes `ghcr.io/hu553in/grooming-studio`; `latest` follows `main`, while `sha-*` tags are
immutable.

The unprivileged image uses `nginx.conf`, serves the SPA from `/srv/grooming-studio`, and falls back
to `index.html` for client-side routes.

## Development

```bash
bun run build
bun run test
bun check
bun check:fix
```

## Tech stack

- React, TypeScript
- Tailwind CSS, Vite
- Vitest, ESLint, Prettier, Stylelint, Knip
- nginx for the published container image
