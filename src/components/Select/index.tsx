import cx from 'clsx';
import { createElement } from 'react';
import SvgIcon from '../SvgIcon';

const selectedContent = createElement('selectedcontent');

export type SelectProps<V extends string> = {
  className?: string,
  variant?: 'standard' | 'outlined',
  value?: V,
  defaultValue?: V,
  onChange?: (event: React.ChangeEvent<Omit<HTMLSelectElement, 'value'> & { value: V }>) => void,
  disabled?: boolean,
  tabIndex?: number,
  children?: React.ReactNode,
  ref?: React.Ref<HTMLSelectElement>,
};

function Select<V extends string>({
  className,
  variant = 'standard',
  children,
  value,
  defaultValue,
  disabled,
  tabIndex,
  onChange,
  ref,
}: SelectProps<V>) {
  return (
    <select
      value={value}
      defaultValue={defaultValue}
      onChange={onChange as any}
      className={cx('Select', `Select--${variant}`, className)}
      disabled={disabled}
      tabIndex={tabIndex}
      ref={ref}
    >
      <button>
        {selectedContent}

        <SvgIcon path="M7 10l5 5 5-5z" className="Select-icon" />
      </button>
      {children}
    </select>
  );
}

export const MenuItem = 'option';

export default Select;
