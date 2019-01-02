FROM node:8.12.0 as sourcecode

WORKDIR /usr/src/app

EXPOSE 3000
EXPOSE 9229
ENV NODE_ENV development
ENV REDIS_ENABLED disabled
ENV PORT 3000

#RUN yarn global add cross-env nodemon webpack
COPY package.json ./
COPY yarn.lock ./

# when env variable is production it doesn't add dev dependancies. we needs them
RUN yarn install --production=false

CMD [ "yarn", "dev" ]

FROM node:8.12.0

# copy only the package.json and yarn.lock first so that we can cache this step
WORKDIR /usr/src/app
ARG WORDPRESS_HEALTH_ENDPOINT
ENV WORDPRESS_HEALTH_ENDPOINT ${WORDPRESS_HEALTH_ENDPOINT}

COPY . .
COPY --from=sourcecode /usr/src/app/node_modules ./node_modules

RUN chmod +x wait-for-it.sh

RUN yarn build

ARG COMMIT_HASH
LABEL maintainer="michael@birdbrain.com.au"
LABEL commit=$COMMIT_HASH

EXPOSE 3000
ENV NODE_ENV production
ENV REDIS_ENABLED enabled
ENV PORT 3000

CMD ./wait-for-it.sh -t 60 ${WORDPRESS_HEALTH_ENDPOINT} -- node compiled/server.js
