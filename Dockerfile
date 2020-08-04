FROM node AS build
ADD . /build
WORKDIR /build
ENV PATH=./node_modules/.bin/:$PATH
RUN npm ci
ENV NODE_ENV=production
RUN ls node_modules/.bin; which cross-env
RUN npm run prod

FROM node:current-alpine
ADD ./docker /u-wave-web
WORKDIR /u-wave-web
COPY --from=build /build/packages/u-wave-web-middleware /u-wave-web/u-wave-web-middleware
ENV PATH=./node_modules/.bin/:$PATH
RUN npm install
CMD ["bin.js"]
