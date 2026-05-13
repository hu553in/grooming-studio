# syntax=docker/dockerfile:1

FROM node:26-slim AS builder
WORKDIR /src

ARG API_BASE_URL
ENV VITE_API_BASE_URL=${API_BASE_URL}

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN --mount=type=cache,target=/var/cache/apt \
  --mount=type=cache,target=/var/lib/apt/lists \
  apt-get update && \
  apt-get install -y --no-install-recommends \
  git

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

RUN --mount=type=cache,target=/root/.npm \
  npm i -g pnpm

RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
  LEFTHOOK=0 pnpm i --frozen-lockfile

COPY . .

RUN pnpm build

FROM nginx:alpine AS runner

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /src/dist/spa /srv/grooming-studio

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
