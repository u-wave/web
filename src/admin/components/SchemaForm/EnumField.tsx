import Typography from '@mui/material/Typography';
import FormHelperText from '@mui/material/FormHelperText';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import type { JSONSchema7 } from 'json-schema';

/** Actually-supported enum value types. */
type EnumValue = string | number;

type EnumFieldProps = {
  className?: string,
  schema: JSONSchema7 & { enum: EnumValue[] },
  value: EnumValue,
  onChange: (value: EnumValue) => void,
};
function EnumField({
  className, schema, value, onChange,
}: EnumFieldProps) {
  return (
    <div className={className} style={{ marginBottom: '8px' }}>
      {schema.title && <Typography gutterBottom>{schema.title}</Typography>}
      <Select
        value={value}
        disabled={schema.readOnly}
        onChange={(event) => onChange(event.target.value)}
      >
        {schema.enum.map((possibleValue: EnumValue) => (
          <MenuItem key={possibleValue} value={possibleValue}>
            {possibleValue}
          </MenuItem>
        ))}
      </Select>
      {schema.description && <FormHelperText>{schema.description}</FormHelperText>}
    </div>
  );
}

export default EnumField;
