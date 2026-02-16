FROM node:23-alpine AS build

WORKDIR /app

# Install pnpm
RUN corepack enable pnpm

COPY package.json pnpm-lock.yaml ./

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

COPY . .

RUN pnpm build

RUN pnpm prune --prod


FROM node:23-alpine AS production

ARG APP_PORT

WORKDIR /app

RUN addgroup -g 1001 -S todo_group && \
  adduser -S todo_user -u 1001

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json ./
COPY --from=build /app/pnpm-lock.yaml ./

RUN chown -R todo_user:todo_group /app

USER todo_user

EXPOSE $APP_PORT

CMD ["node", "dist/main"]
