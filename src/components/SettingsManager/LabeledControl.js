import React from 'react';
import PropTypes from 'prop-types';

// The control is in `children`.
/* eslint-disable jsx-a11y/label-has-for */
const LabeledControl = ({ id, label, children }) => (
  <div>
    <label htmlFor={id}>{label}</label>
    {children}
  </div>
);
/* eslint-enable jsx-a11y/label-has-for */

LabeledControl.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

export default LabeledControl;
