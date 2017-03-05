import * as React from 'react';
import BaseMarkdown from 'react-markdown';

const Markdown = ({ source }) => (
  <BaseMarkdown source={source} />
);

Markdown.propTypes = {
  source: React.PropTypes.string.isRequired
};

export default Markdown;
