import React from 'react';
import PropTypes from 'prop-types';
import { useTranslator } from '@u-wave/react-translate';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionActions from '@mui/material/AccordionActions';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckIcon from '@mui/icons-material/Check';
import WarningIcon from '@mui/icons-material/Warning';
import SchemaForm from '../SchemaForm';

const {
  useCallback,
  useState,
} = React;

function Section({
  schema,
  defaultValue,
  onSave,
}) {
  const { t } = useTranslator();
  const [value, setValue] = useState(defaultValue);
  const [busy, setBusy] = useState(false);
  const [edited, setEdited] = useState(false);
  const [done, setDone] = useState(false);

  const handleChange = useCallback((newValue) => {
    setValue(newValue);
    setEdited(true);
    setDone(false);
  }, []);

  const handleSubmit = useCallback((event) => {
    event.preventDefault();

    setBusy(true);
    onSave(value).then(() => {
      setTimeout(() => {
        setDone(true);
        setEdited(false);
        setBusy(false);
      }, 2_000);
    }, () => {
      // Error is reported in the snackbar, enable the save button again
      setBusy(false);
    });
  }, [value, onSave]);

  let startIcon = null;
  if (busy) {
    startIcon = <CircularProgress color="white" size={16} />;
  }
  if (done) {
    startIcon = <CheckIcon />;
  }

  return (
    <Accordion>
      <AccordionSummary
        className="ServerConfigGroupHeader"
        expandIcon={<ExpandMoreIcon />}
      >
        <div className="ServerConfigGroupHeader-contents">
          <Typography>{schema.title}</Typography>
          <Typography color="textSecondary">{schema.description}</Typography>
        </div>
        {edited ? (
          <div className="ServerConfigGroupHeader-saveWarning">
            <WarningIcon sx={{ marginRight: 1 }} />
            {t('admin.config.unsavedChanges')}
          </div>
        ) : null}
      </AccordionSummary>
      <AccordionDetails>
        <SchemaForm
          schema={schema}
          value={value}
          unwrapRoot={schema.type === 'object'}
          onChange={handleChange}
        />
      </AccordionDetails>
      <AccordionActions>
        <Button
          color="primary"
          variant="contained"
          disabled={!edited || busy}
          startIcon={startIcon}
          onClick={handleSubmit}
        >
          {done ? t('admin.config.saved') : t('admin.config.save')}
        </Button>
      </AccordionActions>
    </Accordion>
  );
}

Section.propTypes = {
  schema: PropTypes.shape({
    type: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  defaultValue: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
};

function partial(fn, arg) {
  return (...args) => fn(arg, ...args);
}

function renderSections(allSchema, allValues, onSave) {
  return Object.keys(allSchema.properties).map((key) => (
    <Section
      key={key}
      schema={allSchema.properties[key]}
      defaultValue={allValues[key]}
      onSave={partial(onSave, key)}
    />
  ));
}

function ServerConfig({
  config,
  configSchema,
  onSaveConfig,
}) {
  return (
    <div>
      {configSchema ? (
        renderSections(configSchema, config, onSaveConfig)
      ) : null}
    </div>
  );
}

ServerConfig.propTypes = {
  config: PropTypes.object,
  configSchema: PropTypes.object,
  onSaveConfig: PropTypes.func.isRequired,
};

export default ServerConfig;
