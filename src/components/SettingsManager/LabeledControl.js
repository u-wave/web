import React from 'react';
import PropTypes from 'prop-types';
import cx from 'clsx';

function LabeledControl({ id, label, children }) {
  /* eslint-disable jsx-a11y/label-has-for */
  return (
    <div className="LabeledControl">
      <label className="LabeledControl-label" htmlFor={id}>{label}</label>
      {React.cloneElement(children, {
        id,
        className: cx(children.className, 'LabeledControl-control'),
      })}
    </div>
  );
  /* eslint-enable jsx-a11y/label-has-for */
}

LabeledControl.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};

export default LabeledControl;
