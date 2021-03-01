FROM node AS build
WORKDIR /build

COPY package.json package-lock.json /build/
RUN npm ci

ENV PATH=./node_modules/.bin/:$PATH
ENV NODE_ENV=production

COPY . /build
RUN npm run prod

FROM node:current-alpine
WORKDIR /u-wave-web

COPY ./docker /u-wave-web
COPY --from=build /build/packages/u-wave-web-middleware /u-wave-web/u-wave-web-middleware
ENV PATH=./node_modules/.bin/:$PATH
RUN npm install
CMD ["bin.js"]
