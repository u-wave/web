/* eslint-disable */
const express = require('express');
const middleware = require('u-wave-web-middleware');
const { emoji } = require('u-wave-web-emojione');

const app = express();
app.use(middleware(null, {
  apiBase: '/api',
  emoji,
}));

app.listen(process.env.PORT, ({ port }) => {
  console.log('listening on port', port);
});
