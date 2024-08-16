import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormHelperText from '@mui/material/FormHelperText';
import type { JSONSchema7, JSONSchema7Object, JSONSchema7Type } from 'json-schema';
import Field from './Field';

type ObjectPropertiesProps = {
  schema: JSONSchema7,
  value: JSONSchema7Object,
  onChange: (value: JSONSchema7Object) => void,
};
function ObjectProperties({
  schema,
  value,
  onChange,
}: ObjectPropertiesProps) {
  const fields = Object.entries(schema.properties!).map(([key, subSchema]) => {
    const subValue = value[key]!;
    const subChange = (newValue: JSONSchema7Type) => onChange({
      ...value,
      [key]: newValue,
    });

    // Internal fields can be skipped.
    // TODO this should really be done server-side for security…
    if (typeof subSchema === 'boolean' || (subSchema.readOnly && subSchema.writeOnly)) {
      return null;
    }

    return (
      <Field
        key={key}
        schema={subSchema}
        value={subValue}
        onChange={subChange}
      />
    );
  });

  return fields;
}

type ObjectFieldProps = {
  schema: JSONSchema7,
  value: JSONSchema7Object,
  onChange: (value: JSONSchema7Object) => void,
};
function ObjectField({ schema, value, onChange }: ObjectFieldProps) {
  return (
    <FormControl component="fieldset">
      {schema.title && <FormLabel component="legend">{schema.title}</FormLabel>}
      {schema.description && <FormHelperText>{schema.description}</FormHelperText>}
      <ObjectProperties schema={schema} value={value} onChange={onChange} />
    </FormControl>
  );
}

export { ObjectProperties };
export default ObjectField;
