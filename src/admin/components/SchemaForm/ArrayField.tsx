import { useTranslator } from '@u-wave/react-translate';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import FormHelperText from '@mui/material/FormHelperText';
import { mdiClose } from '@mdi/js';
import SvgIcon from '../../../components/SvgIcon';
import Field from './Field';
import type { JSONSchema7, JSONSchema7Array, JSONSchema7Type } from 'json-schema';

type ArrayFieldProps = {
  schema: JSONSchema7,
  value: JSONSchema7Array,
  onChange: (value: JSONSchema7Array) => void,
};
function ArrayField({ schema, value, onChange }: ArrayFieldProps) {
  const { t } = useTranslator();

  const remove = (index: number) => {
    onChange([
      ...value.slice(0, index),
      ...value.slice(index + 1),
    ]);
  };
  const replace = (index: number, newValue: JSONSchema7Type) => {
    onChange([
      ...value.slice(0, index),
      newValue,
      ...value.slice(index + 1),
    ]);
  };
  const append = () => {
    onChange([...value, null]);
  };

  return (
    <>
      <Typography gutterBottom>{schema.title}</Typography>
      {value.map((subValue, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={index} className="ArrayFieldElement">
          <Field
            className="ArrayFieldElement-field"
            schema={schema.items as JSONSchema7}
            value={subValue}
            onChange={(newValue) => replace(index, newValue)}
          />
          <IconButton onClick={() => remove(index)}>
            <SvgIcon path={mdiClose} />
          </IconButton>
        </div>
      ))}
      <Button onClick={append}>
        {t('admin.config.array.append')}
      </Button>
      {schema.description && <FormHelperText>{schema.description}</FormHelperText>}
    </>
  );
}

export default ArrayField;
