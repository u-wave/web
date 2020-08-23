import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { styles } from '@material-ui/core/Select/Select';
import FilledInput from '@material-ui/core/FilledInput';
import SelectInput from '@material-ui/core/Select/SelectInput';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const enhance = withStyles(styles, { name: 'SelectInner' });

const outerClasses = {
  focused: 'is-focused',
};

function Select({
  children,
  className,
  classes,
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
        children,
        IconComponent: ArrowDropDownIcon,
        variant: 'filled',
        type: undefined,
        classes,
        autoWidth: false,
        multiple: false,
      }}
    />
  );
}

Select.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  classes: PropTypes.object,
};

export default enhance(Select);
