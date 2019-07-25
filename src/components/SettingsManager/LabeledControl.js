import PropTypes from 'prop-types';
import cx from 'classnames';

// The control is in `children`.
/* eslint-disable jsx-a11y/label-has-for */
const LabeledControl = ({ id, label, children }) => {
  return (
    <div className="LabeledControl">
      <label className="LabeledControl-label" htmlFor={id}>{label}</label>
      {React.cloneElement(children, {
        id,
        className: cx(children.className, 'LabeledControl-control'),
      })}
    </div>
  );
};
/* eslint-enable jsx-a11y/label-has-for */

LabeledControl.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};

export default LabeledControl;
