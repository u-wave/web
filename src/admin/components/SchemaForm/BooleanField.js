import React from 'react';
import PropTypes from 'prop-types';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';

function BooleanField({ schema, value, onChange }) {
  return (
    <>
      <FormControlLabel
        control={(
          <Checkbox
            checked={value}
            onChange={(event, checked) => onChange(checked)}
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
