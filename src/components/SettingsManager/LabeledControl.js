import React from 'react';
import PropTypes from 'prop-types';

const LabeledControl = ({ id, label, children }) => (
  <div>
    <label htmlFor={id}>{label}</label>
    {children}
  </div>
);

LabeledControl.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

export default LabeledControl;
