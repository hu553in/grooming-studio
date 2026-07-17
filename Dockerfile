# syntax=docker/dockerfile:1

FROM oven/bun:1.3.14-slim AS base
WORKDIR /app

ARG API_BASE_URL
ENV VITE_API_BASE_URL=${API_BASE_URL}

FROM base AS deps

COPY package.json bun.lock ./

RUN --mount=type=cache,target=/root/.bun/install/cache \
  LEFTHOOK=0 bun ci

FROM base AS builder

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN bun run build

FROM nginxinc/nginx-unprivileged:1.31.2-alpine AS runner

USER root
RUN apk upgrade --no-cache

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --chown=nginx:nginx --from=builder /app/dist/spa /srv/grooming-studio

USER nginx

RUN nginx -t

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
