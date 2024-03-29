# https://docs.docker.com/develop/develop-images/multistage-build/#stop-at-a-specific-build-stage
# https://docs.docker.com/compose/compose-file/#target


# https://docs.docker.com/engine/reference/builder/#understand-how-arg-and-from-interact
ARG NODE_VERSION=16

# "common" stage
FROM node:${NODE_VERSION}-alpine AS api_platform_pwa_common

RUN apk add g++ make python2

EXPOSE 3000

WORKDIR /usr/src/pwa

ENV NEXT_TELEMETRY_DISABLED 1
ENV CHOKIDAR_USEPOLLING true

# prevent the reinstallation of node modules at every changes in the source code
COPY package.json yarn.lock ./
RUN yarn 

COPY . ./

VOLUME /usr/src/pwa/node_modules


# "development" stage
# depends on the "common" stage above
FROM api_platform_pwa_common AS api_platform_pwa_dev

ENV API_PLATFORM_CLIENT_GENERATOR_OUTPUT .
RUN yarn global add @api-platform/client-generator

CMD ["yarn", "dev"]


# "build" stage
# depends on the "common" stage above
FROM api_platform_pwa_common AS api_platform_pwa_prod

ENV NODE_ENV production
ARG NEXT_PUBLIC_ENTRYPOINT

RUN set -eux; \
	yarn build

CMD ["yarn", "start"]
