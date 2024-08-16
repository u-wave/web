import { useContext } from 'react';
import type { JSONSchema7, JSONSchema7Type } from 'json-schema';
import ControlsContext from './ControlsContext';

const errstyle = { background: 'red', color: 'white' };

function getControlName(schema: JSONSchema7) {
  if ('uw:control' in schema && typeof schema['uw:control'] === 'string') {
    return schema['uw:control'];
  }

  if (Array.isArray(schema.enum)) {
    return 'enum';
  }

  // Not sure what to do with this!
  if (Array.isArray(schema.type)) {
    return undefined;
  }

  return schema.type;
}

type FieldProps = {
  className?: string,
  schema: JSONSchema7,
  value: JSONSchema7Type,
  onChange: (value: JSONSchema7Type) => void,
};

function Field({
  className,
  schema,
  value,
  onChange,
}: FieldProps) {
  const controls = useContext(ControlsContext);

  const controlName = getControlName(schema);
  if (controlName == null) {
    return <p style={errstyle}>Unsupported type</p>;
  }

  const Control = controls.get(controlName); // eslint-disable-line react/destructuring-assignment
  if (Control) {
    return (
      <Control
        className={className}
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

export default Field;
