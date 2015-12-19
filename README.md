# u-wave-web

Web client for [üWave](https://u-wave.github.io).

## Building

The build system is based on Gulp. JavaScript is transpiled by Babel@5 and
bundled by browserify. CSS is preprocessed by several PostCSS plugins.

```bash
npm install
gulp
```

### Tasks

To get things going for dev:

```bash
gulp default # builds everything
gulp watch   # rebuilds JS and CSS on change
```

To start the development server:

```bash
DEBUG=uwave:* gulp serve
# or to do watching and serving in one go:
DEBUG=uwave:* gulp watch serve
```

To get the best possible build for production:

```
gulp default --minify --prerender --no-source-maps
```

### Task list

 * `gulp css` compiles and concatenates the CSS into a single bundle at
   `lib/style.css`.
 * `gulp js:lint` checks your javascript code style.
 * `gulp js` builds a full javascript bundle at `lib/out.js`.
 * `gulp html` builds the main HTML file to `lib/index.html`. Pass the
   `--prerender` flag to also render the React app into the generated file (with
   empty state).
 * `gulp assets` copies the assets from `assets/` to `lib/assets/`. This way the
   entire app can be served from the `lib/` directory.
 * `gulp middleware` builds the default Express middleware used for serving the
   client.
 * the default `gulp` task builds all CSS, javascript, and html.
 * `gulp watch` watches the source files for changes and recompiles on the fly.
   It'll also hot reload components in the browser using [browserify-hmr](https://github.com/AgentME/browserify-hmr).

Pass the `--minify` flag to any task to generate uglified/minified files. Pass
the `--no-source-maps` flag to remove source maps from the minified output.

## License

The üWave web client is licensed under the [MIT](./LICENSE) license.

The default [mention sound file](./assets/audio/mention.opus) comes from a
[Sonics.io](http://sonics.io) pack and is under the [Sonics.io License](http://sonics.io/license).
