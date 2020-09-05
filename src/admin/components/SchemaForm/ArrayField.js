import React from 'react';
import PropTypes from 'prop-types';
import { useTranslator } from '@u-wave/react-translate';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import RemoveIcon from '@material-ui/icons/Close';
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
        <div className="ArrayFieldElement">
          <Field
            className="ArrayFieldElement-field"
            schema={schema.items}
            value={subValue}
            onChange={(newValue) => replace(index, newValue)}
          />
          <IconButton onClick={() => remove(index)}>
            <RemoveIcon />
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
