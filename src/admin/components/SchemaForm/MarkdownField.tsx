import Typography from '@mui/material/Typography';
import FormHelperText from '@mui/material/FormHelperText';
import type { JSONSchema7 } from 'json-schema';
import Markdown from '../../../components/Markdown';

type MarkdownFieldProps = {
  className?: string,
  schema: JSONSchema7,
  value: string,
  onChange: (value: string) => void,
};
function MarkdownField({
  className, schema, value, onChange,
}: MarkdownFieldProps) {
  return (
    <div className={className} style={{ marginBottom: '8px' }}>
      {schema.title && <Typography gutterBottom>{schema.title}</Typography>}
      <div className="TextField" style={{ height: '120px' }}>
        <textarea
          className="TextField-input"
          value={value}
          disabled={schema.readOnly}
          onChange={(event) => onChange(event.target.value)}
        />
      </div>
      {schema.description && <FormHelperText>{schema.description}</FormHelperText>}
      <Markdown source={value} />
    </div>
  );
}

export default MarkdownField;
