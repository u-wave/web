import React from 'react';
import PropTypes from 'prop-types';

const Bold = ({ children, ...props }) => <b {...props}>{children}</b>;

Bold.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Bold;
