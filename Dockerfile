FROM alpine as base
WORKDIR /app
RUN apk add --no-cache yarn
COPY package.json .
RUN yarn global add pm2
EXPOSE 5000
EXPOSE 8080

# DEPS
FROM base AS deps
RUN yarn --production=true
RUN cp -r node_modules node_modules_prod
RUN yarn --production=false

# PROD BUILD
FROM base AS build
ARG ENV
COPY . .
COPY --from=deps /app/node_modules node_modules
ENV ENV ${ENV}
RUN yarn build

# RUN
FROM base AS run
COPY --from=build /app/.next /app/.next
COPY --from=deps /app/node_modules_prod /app/node_modules
COPY . .
ARG ENV
ENV ENV ${ENV}
CMD ["yarn", "start"]