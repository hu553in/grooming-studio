# syntax=docker/dockerfile:1

FROM node:26-slim AS base
WORKDIR /app

ARG API_BASE_URL
ENV VITE_API_BASE_URL=${API_BASE_URL}

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN --mount=type=cache,target=/root/.npm \
  npm i -g pnpm

FROM base AS deps

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
  LEFTHOOK=0 pnpm i --frozen-lockfile

FROM base AS builder

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN pnpm build

FROM nginx:alpine AS runner

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist/spa /srv/grooming-studio

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
