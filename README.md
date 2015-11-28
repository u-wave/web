# u-wave-web

Web client for [üWave](https://u-wave.github.io).

## Building

The build system is based on Gulp. JavaScript is transpiled by Babel@5 and
bundled by browserify. CSS is preprocessed by several PostCSS plugins.

```
npm install
gulp
```

### Tasks

 * `gulp css` compiles and concatenates the CSS into a single bundle at
   `lib/style.css`.
 * `gulp js:lint` checks your javascript code style.
 * `gulp js` builds a full javascript bundle at `lib/out.js`.
 * `gulp html` builds the main HTML file to `lib/index.html`. Pass the
   `--prerender` flag to also render the React app into the generated file (with
   empty state).
 * `gulp assets` copies the assets from `assets/` to `lib/assets/`. This way the
   entire app can be served from the `lib/` directory.
 * the default `gulp` task builds all CSS, javascript, and html.
 * `gulp watch` watches the source files for changes and recompiles on the fly.

Pass the `--minify` flag to any task to generate uglified/minified files. Pass
the `--no-source-maps` flag, too, to remove source maps from the minified
output.

To get things going for dev:

```
gulp default
gulp watch
```

[TODO Add task to run minimal API server]

To get the best possible build for production:

```
gulp default --minify --prerender --no-source-maps
```

## License

[MIT](./LICENSE)
