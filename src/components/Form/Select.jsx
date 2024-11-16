import clsx from 'clsx';
import PropTypes from 'prop-types';
import FilledInput from '@mui/material/FilledInput';
import SelectInput from '@mui/material/Select/SelectInput';
import { mdiMenuDown } from '@mdi/js';
import SvgIcon from '../SvgIcon';

const outerClasses = {
  focused: 'is-focused',
};

function Select({
  children,
  className,
  classes,
  tabIndex,
  onChange,
  ...props
}) {
  return (
    <FilledInput
      disableUnderline
      className={clsx('Select', className)}
      classes={outerClasses}
      inputComponent={SelectInput}
      {...props}
      inputProps={{
        onChange,
        children,
        IconComponent: SvgIcon,
        iconProps: { path: mdiMenuDown },
        classes,
        autoWidth: false,
        multiple: false,
        tabIndex,
      }}
    />
  );
}

Select.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  tabIndex: PropTypes.number,
  classes: PropTypes.object,
  onChange: PropTypes.func,
};

export default Select;
