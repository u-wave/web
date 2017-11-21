import React from 'react';
import PropTypes from 'prop-types';
import BaseMarkdown from 'react-markdown';

const Markdown = ({ source }) => (
  <BaseMarkdown
    escapeHtml={false}
    source={source}
  />
);

Markdown.propTypes = {
  source: PropTypes.string.isRequired
};

export default Markdown;
