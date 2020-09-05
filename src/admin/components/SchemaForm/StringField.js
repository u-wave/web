import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '../../../components/Form/TextField';

function StringField({
  className, schema, value, onChange,
}) {
  return (
    <div className={className}>
      {schema.title && <Typography gutterBottom>{schema.title}</Typography>}
      <TextField
        value={value}
        onChange={(event) => onChange(event.target.value)}
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
