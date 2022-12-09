import { readFileSync } from 'node:fs';
import React from 'react';
import PropTypes from 'prop-types';
import Markdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

function MarkdownPage({ path }) {
  const source = readFileSync(path, 'utf8');

  return (
    <html lang="en" dir="ltr">
      <head>
        <meta charSet="utf-8" />
        <title>Markdown page</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="src/markdown.css" />
      </head>
      <body>
        <div id="app">
          <Markdown rehypePlugins={[rehypeRaw]}>
            {source}
          </Markdown>
        </div>
      </body>
    </html>
  );
}

MarkdownPage.propTypes = {
  path: PropTypes.string.isRequired,
};

export default MarkdownPage;
