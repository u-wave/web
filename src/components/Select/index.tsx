import type { SelectProps as MuiSelectProps } from '@mui/material/Select';
import cx from 'clsx';
import { createElement } from 'react';
import SvgIcon from '../SvgIcon';

const selectedContent = createElement('selectedcontent');

export type SelectProps<V extends string> = Omit<MuiSelectProps<V>, 'onChange'> & {
  onChange?: (event: React.ChangeEvent<Omit<HTMLSelectElement, 'value'> & { value: V }>) => void,
};

function Select<V extends string>({
  className,
  variant = 'standard',
  children,
  value,
  defaultValue,
  tabIndex,
  onChange,
}: SelectProps<V>) {
  return (
    <select
      value={value}
      defaultValue={defaultValue}
      onChange={onChange as any}
      className={cx('Select', `Select--${variant}`, className)}
      tabIndex={tabIndex}
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
