#!/bin/sh

browserify                                \
  -p [ css-modulesify -o lib/style.css ]  \
  -t babelify                             \
  -e src/js/app.js                        \
  -o lib/out.js                           \
  --debug
