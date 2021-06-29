import React from 'react';
import PropTypes from 'prop-types';
import BaseMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';

const Markdown = ({ source }) => (
  <BaseMarkdown rehypePlugins={[rehypeRaw, rehypeSanitize]}>{source}</BaseMarkdown>
);

Markdown.propTypes = {
  source: PropTypes.string.isRequired,
};

export default Markdown;
