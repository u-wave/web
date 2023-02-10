import React from 'react';
import PropTypes from 'prop-types';
import ControlsContext from './ControlsContext';

const {
  useContext,
} = React;

const errstyle = { background: 'red', color: 'white' };

function getControlName(schema) {
  if (schema['uw:control']) {
    return schema['uw:control'];
  }

  if (Array.isArray(schema.enum)) {
    return 'enum';
  }

  return schema.type;
}

function Field({
  schema,
  value,
  onChange,
  ...props
}) {
  const controls = useContext(ControlsContext);

  const controlName = getControlName(schema);
  const Control = controls.get(controlName); // eslint-disable-line react/destructuring-assignment
  if (Control) {
    return (
      <Control
        {...props}
        schema={schema}
        value={value}
        onChange={onChange}
      />
    );
  }

  return (
    <p style={errstyle}>
      Unknown:
      {controlName}
    </p>
  );
}

Field.propTypes = {
  schema: PropTypes.object.isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
};

export default Field;
