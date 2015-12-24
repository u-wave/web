# u-wave-web

Web client for [üWave](https://u-wave.github.io).

## Dependencies

For running in the browser: something modern. The aim is to support ~IE10+ and
other modern browsers (recent Chromes and Firefoxes, at least). If you use
something reasonably recent and üWave doesn't work, [file a bug](https://github.com/goto-bus-stop/u-wave-web/issues)!

For development: Node versions >=4 and NPM 3.x.

## Getting Things Working

Currently üWave isn't yet public, so the different u-wave modules that the web
client needs for development aren't yet public either. That means that you'll
have to do a little bit of manual setup.

First, clone the [u-wave-server](https://github.com/sooyou/u-wave-server) and
[u-wave-api-v1](https://github.com/sooyou/u-wave-api-v1) repositories. In both
directories, run `npm install`, followed by `npm run build`, and finally
`npm link`.

```bash
cd ./u-wave-server
npm install
npm run build
npm link

cd ../u-wave-api-v1
npm install
npm run build
npm link
```

The `npm link` command will create a symlink to the module in the global modules
folder. Now, you can create symlinks to the global modules folder inside the
`u-wave-web` folder:

```bash
cd ../u-wave-web
npm link u-wave u-wave-api-v1
```

…and now you should be good to go!

(Don't worry, this will all be easier once the `u-wave-server` and
`u-wave-api-v1` modules are on NPM.)

## Building

The build system is based on Gulp. JavaScript is transpiled by Babel@5 and
bundled by browserify. CSS is preprocessed by several PostCSS plugins.

```bash
npm install
gulp
```

See the [Gulp tasks documentation](./tasks/#readme) for more.

## License

The üWave web client is licensed under the [MIT](./LICENSE) license.

The default [mention sound file](./assets/audio/mention.opus) comes from a
[Sonics.io](http://sonics.io) pack and is under the [Sonics.io License](http://sonics.io/license).
