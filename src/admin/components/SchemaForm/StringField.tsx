import Typography from '@mui/material/Typography';
import FormHelperText from '@mui/material/FormHelperText';
import TextField from '../../../components/Form/TextField';
import type { JSONSchema7 } from 'json-schema';

type StringFieldProps = {
  className?: string,
  schema: JSONSchema7,
  value: string,
  onChange: (value: string) => void,
};
function StringField({
  className, schema, value, onChange,
}: StringFieldProps) {
  return (
    <div className={className} style={{ marginBottom: '8px' }}>
      {schema.title && <Typography gutterBottom>{schema.title}</Typography>}
      <TextField
        type={schema.writeOnly ? 'password' : 'text'}
        value={value}
        disabled={schema.readOnly}
        onChange={(event) => onChange(event.target.value ?? undefined)}
      />
      {schema.description && <FormHelperText>{schema.description}</FormHelperText>}
    </div>
  );
}

export default StringField;
