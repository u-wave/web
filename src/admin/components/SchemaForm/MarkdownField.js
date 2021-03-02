import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import FormHelperText from '@material-ui/core/FormHelperText';
import Markdown from '../../../components/Markdown';
import TextField from '../../../components/Form/TextField';

function MarkdownField({
  className, schema, value, onChange,
}) {
  return (
    <div className={className} style={{ marginBottom: '8px' }}>
      {schema.title && <Typography gutterBottom>{schema.title}</Typography>}
      <div className="TextField">
        <textarea
          className="TextField-input"
          value={value}
          disabled={schema.readOnly}
          onChange={(event) => onChange(event.target.value || undefined)}
        />
      </div>
      {schema.description && <FormHelperText>{schema.description}</FormHelperText>}
    </div>
  );
}

MarkdownField.propTypes = {
  className: PropTypes.string,
  schema: PropTypes.object.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default MarkdownField;
