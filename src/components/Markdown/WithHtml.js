import React from 'react';
import PropTypes from 'prop-types';
import BaseMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

/** UNSAFE markdown rendering with embedded HTML support. */
function MarkdownWithHtml({ source }) {
  return (
    <BaseMarkdown rehypePlugins={[rehypeRaw]}>
      {source}
    </BaseMarkdown>
  );
}

MarkdownWithHtml.propTypes = {
  source: PropTypes.string.isRequired,
};

export default MarkdownWithHtml;
