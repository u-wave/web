import React from 'react';
import PropTypes from 'prop-types';
import ControlsContext from './ControlsContext';

const {
  useContext,
} = React;

const errstyle = { background: 'red', color: 'white' };

function Field({
  schema,
  value,
  onChange,
}) {
  const controls = useContext(ControlsContext);

  const controlName = schema['uw:control'] || schema.type;
  const Control = controls.get(controlName);
  if (Control) {
    return <Control schema={schema} value={value} onChange={onChange} />;
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
  value: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Field;
