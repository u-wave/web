import React from 'react';
import PropTypes from 'prop-types';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';

function BooleanField({ schema, value, onChange }) {
  return (
    <>
      <FormControlLabel
        control={(
          <Checkbox
            checked={value}
            onChange={(event) => onChange(event.target.checked)}
          />
        )}
        label={schema.title}
      />
      {schema.description && <FormHelperText>{schema.description}</FormHelperText>}
    </>
  );
}

BooleanField.propTypes = {
  schema: PropTypes.object.isRequired,
  value: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

export default BooleanField;
