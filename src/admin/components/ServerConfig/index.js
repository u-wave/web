import React from 'react';
import PropTypes from 'prop-types';
import { useTranslator } from '@u-wave/react-translate';
import Typography from '@material-ui/core/Typography';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionActions from '@material-ui/core/AccordionActions';
import LoadingButton from '@material-ui/lab/LoadingButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CheckIcon from '@material-ui/icons/Check';
import WarningIcon from '@material-ui/icons/Warning';
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
      setDone(true);
      setEdited(false);
      setBusy(false);
    }, () => {
      // Error is reported in the snackbar, enable the save button again
      setBusy(false);
    });
  }, [value, onSave]);

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
        <LoadingButton
          color="primary"
          variant="contained"
          pending={busy}
          disabled={!edited}
          startIcon={done ? <CheckIcon /> : null}
          onClick={handleSubmit}
        >
          {done ? t('admin.config.saved') : t('admin.config.save')}
        </LoadingButton>
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
