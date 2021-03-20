import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

function EnumField({
  className, schema, value, onChange,
}) {
  return (
    <div className={className} style={{ marginBottom: '8px' }}>
      {schema.title && <Typography gutterBottom>{schema.title}</Typography>}
      <Select
        value={value}
        disabled={schema.readOnly}
        onChange={(event) => onChange(event.target.value || undefined)}
      >
        {schema.enum.map((possibleValue) => (
          <MenuItem key={possibleValue} value={possibleValue}>
            {possibleValue}
          </MenuItem>
        ))}
      </Select>
      {schema.description && <FormHelperText>{schema.description}</FormHelperText>}
    </div>
  );
}

EnumField.propTypes = {
  className: PropTypes.string,
  schema: PropTypes.object.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default EnumField;
