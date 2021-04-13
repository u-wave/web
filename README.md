# u-wave-web

Web client for [üWave][].

[Dependencies](#dependencies) - [Setup](#getting-things-working) -
[Building](#building) - [API](#api) - [License](#license)

![Screenshot](./assets/screenshot.png)

## Dependencies

For running in the browser: something modern. The aim is to support ~IE11+ and
other modern browsers (recent Chromes and Firefoxes, at least). If you use
something reasonably recent and üWave doesn't work, [file a bug][]!

The server parts of üWave require Node version >= 12.0.0.

## Getting Things Working

To run the web client, you need an [üWave server][u-wave-core] to connect to.
For development, first install the server:

```bash
git clone https://github.com/u-wave/core u-wave-core
cd u-wave-core
npm install
npm start
```

`npm start` will run the üWave server on port 6042.

Then in a separate terminal do:

```bash
git clone https://github.com/u-wave/web u-wave-web
cd u-wave-web
npm install
npm run dev
```

This will run the web client on port 6041. Visit <http://localhost:6041> to use
it!

## Building

There are two main build scripts: one for development, and one for production.

The development script runs a local üWave server and auto-reloads the web client
when you make changes.

```bash
npm run dev
```

When building the üWave web client for use on a server, the production build
should be used instead. It removes costly debugging helpers from the code and
minifies everything as much as possible.

```bash
npm run prod
```

The `prod` script doesn't run a local server. To try out your production build,
you can use the standalone `serve` script:

```bash
npm run serve
```

## API

Please see the README in the [compiled npm package][] for API documentation.

## License

The üWave web client is licensed under the [MIT][] license.

The default [mention sound file][] comes from a [Sonics.io][] pack and is under
the [Sonics.io License][] (archive link).

[üWave]: https://u-wave.net
[u-wave-core]: https://github.com/u-wave/core
[compiled npm package]: ./npm/README.md
[file a bug]: https://github.com/u-wave/web/issues
[MIT]: ./LICENSE
[mention sound file]: ./assets/audio/mention.opus
[Sonics.io]: https://web.archive.org/web/20150905161415/http://www.sonics.io/
[Sonics.io License]: https://web.archive.org/web/20150912030216/http://www.sonics.io/license/
