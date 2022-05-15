import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import FormHelperText from '@mui/material/FormHelperText';
import TextField from '../../../components/Form/TextField';

function StringField({
  className, schema, value, onChange,
}) {
  return (
    <div className={className} style={{ marginBottom: '8px' }}>
      {schema.title && <Typography gutterBottom>{schema.title}</Typography>}
      <TextField
        type={schema.writeOnly ? 'password' : 'text'}
        value={value}
        disabled={schema.readOnly}
        onChange={(event) => onChange(event.target.value ?? undefined)}
      />
      {schema.description && <FormHelperText>{schema.description}</FormHelperText>}
    </div>
  );
}

StringField.propTypes = {
  className: PropTypes.string,
  schema: PropTypes.object.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default StringField;
