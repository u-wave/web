import React from 'react';
import PropTypes from 'prop-types';
import { useTranslator } from '@u-wave/react-translate';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionActions from '@material-ui/core/AccordionActions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SchemaForm from '../SchemaForm'; // eslint-disable-line

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

  const handleChange = useCallback((newValue) => {
    setValue(newValue);
  }, []);

  const handleSubmit = useCallback((event) => {
    event.preventDefault();

    onSave(value);
  }, [value, onSave]);

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <div>
          <Typography>{schema.title}</Typography>
          <Typography color="textSecondary">{schema.description}</Typography>
        </div>
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
          onClick={handleSubmit}
        >
          {t('admin.config.save')}
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
