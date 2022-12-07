import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import FormHelperText from '@mui/material/FormHelperText';
import TextField from '../../../components/Form/TextField';

function NumberField({ schema, value, onChange }) {
  return (
    <>
      {schema.title && <Typography gutterBottom>{schema.title}</Typography>}
      <TextField
        type="number"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
      {schema.description && <FormHelperText>{schema.description}</FormHelperText>}
    </>
  );
}

NumberField.propTypes = {
  schema: PropTypes.object.isRequired,
  value: PropTypes.number,
  onChange: PropTypes.func.isRequired,
};

export default NumberField;
