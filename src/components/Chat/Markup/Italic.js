import React from 'react';
import PropTypes from 'prop-types';

const Italic = ({ children, ...props }) => <i {...props}>{children}</i>;

Italic.propTypes = {
  children: PropTypes.node.isRequired
};

export default Italic;
