import * as React from 'react';

const LabeledControl = ({ id, label, children }) => (
  <div>
    <label htmlFor={id}>{label}</label>
    {children}
  </div>
);

LabeledControl.propTypes = {
  id: React.PropTypes.string.isRequired,
  label: React.PropTypes.string.isRequired,
  children: React.PropTypes.node.isRequired
};

export default LabeledControl;
