import cx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';

const {
  useEffect,
  useImperativeHandle,
  useRef,
} = React;

const TextField = React.forwardRef(({
  className,
  type = 'text',
  icon,
  autoFocus,
  ...props
}, ref) => {
  const refInput = useRef(null);
  useImperativeHandle(ref, () => ({
    get value() { return refInput.current.value; },
  }));
  useEffect(() => {
    if (autoFocus) {
      refInput.current?.focus();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
  autoFocus: PropTypes.bool,
};

export default TextField;
