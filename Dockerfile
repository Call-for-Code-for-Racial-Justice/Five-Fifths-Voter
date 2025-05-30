FROM docker.io/node:22-alpine AS base
FROM base AS builder
WORKDIR /mono
COPY app app
COPY package.json .
COPY package-lock.json .
RUN npm i  && \
    npm run build -w app

# Production image, copy all the files and run nuxt
FROM base AS runner
WORKDIR /webapp
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nuxtjs
COPY --from=builder --chown=nuxtjs:nodejs /mono/app/.output /webapp/.output
USER nuxtjs
EXPOSE 8080
WORKDIR /webapp/.output
ENV NUXT_HOST=0.0.0.0
ENV PORT=8080
CMD ["node", "/webapp/.output/server/index.mjs"]
