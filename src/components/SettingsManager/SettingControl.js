import React from 'react';
import PropTypes from 'prop-types';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const labelClasses = {
  root: 'SettingControl-label',
  label: 'SettingControl-labelText',
};

function SettingControl({ label, helpText, children }) {
  return (
    <FormControl className="SettingControl">
      <FormControlLabel
        classes={labelClasses}
        label={label}
        labelPlacement="start"
        control={children}
      />
      {helpText ? (<FormHelperText>{helpText}</FormHelperText>) : null}
    </FormControl>
  );
}

SettingControl.propTypes = {
  label: PropTypes.node.isRequired,
  helpText: PropTypes.node,
  children: PropTypes.element.isRequired,
};

export default SettingControl;
