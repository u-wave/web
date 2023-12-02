import cx from 'clsx';
import React from 'react';

const {
  useEffect,
  useImperativeHandle,
  useRef,
} = React;

interface TextFieldProps extends React.ComponentProps<'input'> {
  className?: string,
  type?: string,
  icon?: React.ReactNode,
  autoFocus?: boolean,
}
const TextField = React.forwardRef(({
  className,
  type = 'text',
  icon,
  autoFocus,
  ...props
}: TextFieldProps, ref) => {
  const refInput = useRef<HTMLInputElement>(null);
  useImperativeHandle(ref, () => ({
    get value() { return refInput.current?.value; },
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

export default TextField;
