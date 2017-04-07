import React from 'react';
import PropTypes from 'prop-types';

const StrikeThrough = ({ children, ...props }) => <s {...props}>{children}</s>;

StrikeThrough.propTypes = {
  children: PropTypes.node.isRequired
};

export default StrikeThrough;
