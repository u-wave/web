import React from 'react';
import PropTypes from 'prop-types';

const Code = ({ children, ...props }) => <code {...props}>{children}</code>;

Code.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Code;
