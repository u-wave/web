import cx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';

const {
  useImperativeHandle,
  useRef,
} = React;

function TextField({
  className,
  type = 'text',
  icon,
  ...props
}, ref) {
  const refInput = useRef(null);
  useImperativeHandle(ref, () => ({
    get value() { return refInput.current.value; },
  }));

  return (
    <div className={cx('TextField', className)}>
      <input
        ref={refInput}
        className="TextField-input"
        type={type}
        {...props}
      />
      <div className="TextField-icon">{icon}</div>
    </div>
  );
}

TextField.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  icon: PropTypes.node.isRequired,
};

export default React.forwardRef(TextField);
