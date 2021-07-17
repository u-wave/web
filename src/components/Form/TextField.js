import cx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';

const {
  useImperativeHandle,
  useRef,
} = React;

const TextField = React.forwardRef(({
  className = null,
  type = 'text',
  icon = null,
  ...props
}, ref) => {
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
      {icon ? (
        <div className="TextField-icon">{icon}</div>
      ) : null}
    </div>
  );
});

TextField.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  icon: PropTypes.node,
};

export default TextField;
