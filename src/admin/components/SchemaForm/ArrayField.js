import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import FormHelperText from '@material-ui/core/FormHelperText';
import Field from './Field';

function ArrayField({ schema, value, onChange }) {
  return (
    <>
      <Typography gutterBottom>{schema.title}</Typography>
      {value.map((subValue, index) => (
        <Field
          schema={schema.items}
          value={subValue}
          onChange={(newValue) => onChange([
            ...value.slice(0, index),
            newValue,
            ...value.slice(index + 1),
          ])}
        />
      ))}
      {schema.description && <FormHelperText>{schema.description}</FormHelperText>}
    </>
  );
}

ArrayField.propTypes = {
  schema: PropTypes.object.isRequired,
  value: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ArrayField;
