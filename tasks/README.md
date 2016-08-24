# üWave Web Client build tasks

This folder contains Gulp tasks for the üWave web client. Most tasks deal with
building/compiling/bundling things.

If tasks fail, make sure to run `npm install` to pull in all the necessary
dependencies. If that doesn't help, feel free to [file a bug](https://github.com/u-wave/u-wave-web/issues).

## Development

To get things going for development:

```bash
gulp default # builds everything
gulp watch   # rebuilds JS and CSS on change
```

The `watch` task will not only rebuild your JS and CSS files, but also
live-reload recompiled JavaScript modules in the browser using
[browserify-hmr](https://github.com/AgentME/browserify-hmr).

To start the development server:

```bash
DEBUG=uwave:* gulp serve
# OR to do watching and serving in one go:
DEBUG=uwave:* gulp watch serve
```

This starts both the [u-wave-server](https://github.com/u-wave/u-wave-server)
with an [HTTP API](https://github.com/u-wave/u-wave-api-v1), and serves the web
client on port 6041.

## Production

To get the best possible build for production:

```
gulp default --minify
```

This will generate `lib/index.html` and `lib/app.js` with the smallest
minification options. At this point you can safely copy the entire contents of
the `lib/` directory to your web host.

## Task list

 * `gulp css` compiles and concatenates the CSS into a single bundle at
   `lib/style.css`.
 * `gulp js:lint` checks your javascript code style.
 * `gulp js` builds a full javascript bundle at `lib/out.js`.
 * `gulp html` builds the main HTML file to `lib/index.html`.
 * `gulp assets` copies the assets from `assets/` to `lib/assets/`. This way the
   entire app can be served from the `lib/` directory.
 * `gulp middleware` builds the default Express middleware used for serving the
   client.
 * the default `gulp` task builds all CSS, javascript, and html.
 * `gulp serve` runs a development API and client server on port 6041. Pass
   `--port $PORT` to listen on a port of your choice instead.
 * `gulp watch` watches the source files for changes and recompiles on the fly.
   It'll also hot reload components in the browser using [browserify-hmr](https://github.com/AgentME/browserify-hmr).

Pass the `--minify` flag to any task to generate uglified/minified files.
