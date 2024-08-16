import Typography from '@mui/material/Typography';
import FormHelperText from '@mui/material/FormHelperText';
import type { JSONSchema7 } from 'json-schema';
import TextField from '../../../components/Form/TextField';

type NumberFieldProps = {
  schema: JSONSchema7,
  value: number,
  onChange: (value: number) => void,
};
function NumberField({ schema, value, onChange }: NumberFieldProps) {
  return (
    <>
      {schema.title && <Typography gutterBottom>{schema.title}</Typography>}
      <TextField
        type="number"
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
      {schema.description && <FormHelperText>{schema.description}</FormHelperText>}
    </>
  );
}

export default NumberField;
