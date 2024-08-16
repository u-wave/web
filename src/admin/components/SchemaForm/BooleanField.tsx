import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';
import type { JSONSchema7 } from 'json-schema';

type BooleanFieldProps = {
  schema: JSONSchema7,
  value: boolean,
  onChange: (value: boolean) => void,
};
function BooleanField({ schema, value, onChange }: BooleanFieldProps) {
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

export default BooleanField;
