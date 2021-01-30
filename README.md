# u-wave-web

Web client for [üWave][].

[Dependencies](#dependencies) - [Setup](#getting-things-working) -
[Building](#building) - [Server API](#server-api) - [Client API](#client-api) -
[License](#license)

![Screenshot](./assets/screenshot.png)

## Dependencies

For running in the browser: something modern. The aim is to support ~IE11+ and
other modern browsers (recent Chromes and Firefoxes, at least). If you use
something reasonably recent and üWave doesn't work, [file a bug][]!

The server parts of üWave require Node version >= 10.13.0.

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

## Server API

```js
import createWebClient from 'u-wave-web-middleware';
```

### createWebClient(options={})

Create a Web client middleware for use with express-style server libraries.

**Parameters**

 * `options` - Client options. See the [Client API](#client-parameters) section.

**Example**

This is a small example üWave server on top of Express, using ReCaptcha and
[EmojiOne][] emoji from [u-wave-web-emojione][].

```js
import express from 'express';
import createWebClient from 'u-wave-web-middleware';
import emojione from 'u-wave-web-emojione';

const app = express();

app.listen(6041);

app.use('/assets/emoji', emojione.middleware());
app.use('/', createWebClient({
  // Use nginx to send this traffic to the API server.
  apiBase: '/api',
  emoji: emojione.emoji,
  recaptcha: { key: 'my ReCaptcha site key' },
}));
```

## Client API

```js
import Uwave from 'u-wave-web'
```

### const uw = new Uwave(options={})

Create a new üWave web client.

<a id="client-parameters"></a>
**Parameters**

 * `options`
   * `options.apiBase` - Base URL to the mount point of the
     [üWave Web API][u-wave-core] to talk to.
     Defaults to `/api`, but it's recommended to set this explicitly.
   * `options.emoji` - An object describing the emoji that will be available in
     the chat. Keys are emoji shortcodes (without `:`), and values are image
     filenames.
   * `options.recaptcha` - An object containing ReCaptcha options used to ensure
     new user registrations are human. This option should only be passed if the
     [Web API][u-wave-core] is configured to check for ReCaptcha entries.

     * `options.recaptcha.key` - ReCaptcha site key. This can be obtained from
       the "Keys" panel in the [ReCaptcha site admin page][recaptcha].

   * `options.title` - Document title, what's shown in the tab by the browser.
     Default "üWave".

### uw.source(sourceType, sourcePlugin, options={})

Add a media source. Media sources should also be registered with the
[üWave Core module][u-wave-core] on the server side.

**Parameters**

 * `sourceType` - String representing the source type. Must be the same as the
   one used on the server side.
 * `sourcePlugin` - Factory function for the plugin. This factory function will
   receive two arguments: the `Uwave` class instance, and the options object
   passed to `.source()`.
 * `options` - Options to be passed to the source plugin.

**Example**

```js
import youTubeSource from 'u-wave-web-youtube';

uw.source('youtube', youTubeSource);
```

### uw.renderToDOM(target)

Start the web client and render it into a DOM element.

**Parameters**

 * `target` - A DOM element.

**Example**

```js
uw.renderToDOM(document.getElementById('app'));
```

## License

The üWave web client is licensed under the [MIT][] license.

The default [mention sound file][] comes from a [Sonics.io][] pack and is under
the [Sonics.io License][] (archive link).

[üWave]: https://u-wave.net
[u-wave-core]: https://github.com/u-wave/core
[u-wave-web-emojione]: https://github.com/u-wave/u-wave-web-emojione

[file a bug]: https://github.com/u-wave/web/issues

[recaptcha]: https://www.google.com/recaptcha/admin#list
[EmojiOne]: https://github.com/Ranks/emojione
[MIT]: ./LICENSE
[mention sound file]: ./assets/audio/mention.opus
[Sonics.io]: https://web.archive.org/web/20150905161415/http://www.sonics.io/
[Sonics.io License]: https://web.archive.org/web/20150912030216/http://www.sonics.io/license/
