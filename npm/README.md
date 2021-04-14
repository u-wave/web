# u-wave-web

Web client for [üWave][].

This package contains the compiled client side and server-side middleware. This is all you need to serve the web client.

![Screenshot](../assets/screenshot.png)

## API

```js
import createWebClient from 'u-wave-web/middleware';
```

### `createWebClient(options={})`

Create a Web client middleware for use with express-style server libraries.

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
     [HTTP API][u-wave-core] is configured to check for ReCaptcha entries.

     * `options.recaptcha.key` - ReCaptcha site key. This can be obtained from
       the "Keys" panel in the [ReCaptcha site admin page][recaptcha].

   * `options.title` - Document title, what's shown in the tab by the browser.
     Default "üWave".

**Example**

This is a small example üWave server on top of Express, using ReCaptcha and
[EmojiOne][] emoji from [u-wave-web-emojione][].

```js
import express from 'express';
import createWebClient from 'u-wave-web/middleware';
import emojione from 'u-wave-web-emojione';

const app = express();

app.listen(6041);

app.use('/assets/emoji', emojione.middleware());
app.use('/', createWebClient({
  // Use nginx to send this traffic to the API server.
  apiBase: 'https://example.com/api',
  emoji: emojione.emoji,
  recaptcha: { key: 'my ReCaptcha site key' },
}));
```

## License

[MIT][]

[üWave]: https://u-wave.net
[u-wave-web]: https://npmjs.com/package/u-wave-web
[MIT]: ./LICENSE

[u-wave-web-emojione]: https://github.com/u-wave/u-wave-web-emojione
[recaptcha]: https://www.google.com/recaptcha/admin#list
[EmojiOne]: https://github.com/Ranks/emojione
