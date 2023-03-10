import React from 'react';
import PropTypes from 'prop-types';
import { useTranslator } from '@u-wave/react-translate';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import FormHelperText from '@mui/material/FormHelperText';
import { mdiClose } from '@mdi/js';
import SvgIcon from '../../../components/SvgIcon';
import Field from './Field';

function ArrayField({ schema, value, onChange }) {
  const { t } = useTranslator();

  const remove = (index) => {
    onChange([
      ...value.slice(0, index),
      ...value.slice(index + 1),
    ]);
  };
  const replace = (index, newValue) => {
    onChange([
      ...value.slice(0, index),
      newValue,
      ...value.slice(index + 1),
    ]);
  };
  const append = () => {
    onChange([
      ...value,
      undefined,
    ]);
  };

  return (
    <>
      <Typography gutterBottom>{schema.title}</Typography>
      {value.map((subValue, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={index} className="ArrayFieldElement">
          <Field
            className="ArrayFieldElement-field"
            schema={schema.items}
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

ArrayField.propTypes = {
  schema: PropTypes.object.isRequired,
  value: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ArrayField;
