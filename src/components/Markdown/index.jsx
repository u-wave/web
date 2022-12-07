import React from 'react';
import PropTypes from 'prop-types';
import BaseMarkdown from 'react-markdown';

function Markdown({ source }) {
  return (
    <BaseMarkdown>{source}</BaseMarkdown>
  );
}

Markdown.propTypes = {
  source: PropTypes.string.isRequired,
};

export default Markdown;
