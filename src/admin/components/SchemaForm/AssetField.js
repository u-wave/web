import React from 'react';
import PropTypes from 'prop-types';
import { useAsyncCallback } from 'react-async-hook';
import Typography from '@mui/material/Typography';
import FormHelperText from '@mui/material/FormHelperText';
import Button from '@mui/material/Button';
import FileIcon from '@mui/icons-material/FileUpload';
import TextField from '../../../components/Form/TextField';

const {
  useRef,
} = React;

function AssetField({
  className,
  schema,
  value,
  onChange,
}) {
  const fileInput = useRef(null);
  const handleSelect = useAsyncCallback(async (event) => {
    const file = event.target.files[0];
    const body = new FormData();
    body.append('file', file);

    const res = await fetch('/api/server/config/asset/u-wave:base.logo', {
      method: 'put',
      body,
    });
    const json = await res.json();
    const { data } = json;
    onChange(data.path);
  }, [onChange]);

  return (
    <div className={className} style={{ marginBottom: '8px' }}>
      {schema.title && <Typography gutterBottom>{schema.title}</Typography>}
      <input ref={fileInput} type="file" onChange={handleSelect.execute} style={{ display: 'none' }} />
      <div style={{ display: 'flex', gap: '.5rem' }}>
        <TextField type="text" value={value} disabled icon={<FileIcon />} />
        <Button
          variant="contained"
          onClick={() => fileInput.current.click()}
        >
          Select
        </Button>
      </div>
      {schema.description && <FormHelperText>{schema.description}</FormHelperText>}
    </div>
  );
}

AssetField.propTypes = {
  className: PropTypes.string,
  schema: PropTypes.object.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default AssetField;
