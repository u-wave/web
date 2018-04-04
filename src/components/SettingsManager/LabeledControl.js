import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

// The control is in `children`.
/* eslint-disable jsx-a11y/label-has-for */
const LabeledControl = ({ id, label, children }) => {
  const control = React.Children.only(children);

  return (
    <div className="LabeledControl">
      <label className="LabeledControl-label" htmlFor={id}>{label}</label>
      {React.cloneElement(control, {
        id,
        className: cx(control.className, 'LabeledControl-control'),
      })}
    </div>
  );
};
/* eslint-enable jsx-a11y/label-has-for */

LabeledControl.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default LabeledControl;
