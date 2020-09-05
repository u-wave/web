import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '../../../components/Form/TextField';

function StringField({ schema, value, onChange }) {
  return (
    <>
      {schema.title && <Typography gutterBottom>{schema.title}</Typography>}
      <TextField
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
      {schema.description && <FormHelperText>{schema.description}</FormHelperText>}
    </>
  );
}

StringField.propTypes = {
  schema: PropTypes.object.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default StringField;
