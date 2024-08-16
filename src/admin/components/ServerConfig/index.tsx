import { useCallback, useState } from 'react';
import { useTranslator } from '@u-wave/react-translate';
import { useAsyncCallback } from 'react-async-hook';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionActions from '@mui/material/AccordionActions';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { mdiCheck, mdiAlert, mdiUnfoldMoreHorizontal } from '@mdi/js';
import type { JSONSchema7, JSONSchema7Object } from 'json-schema';
import SvgIcon from '../../../components/SvgIcon';
import SchemaForm from '../SchemaForm';

type SectionProps = {
  schema: JSONSchema7,
  defaultValue: JSONSchema7Object,
  onSave: (value: JSONSchema7Object) => Promise<void>,
};
function Section({
  schema,
  defaultValue,
  onSave,
}: SectionProps) {
  const { t } = useTranslator();
  const [value, setValue] = useState(defaultValue);
  const [edited, setEdited] = useState(false);

  const save = useAsyncCallback(async (event) => {
    event.preventDefault();

    await onSave(value);
    setEdited(false);
  });

  const handleChange = useCallback((newValue: JSONSchema7Object) => {
    setValue(newValue);
    setEdited(true);
    save.reset();
  }, [save]);

  let startIcon = null;
  if (save.loading) {
    startIcon = <CircularProgress color="inherit" size={16} />;
  }
  if (save.status === 'success') {
    startIcon = <SvgIcon path={mdiCheck} />;
  }

  return (
    <Accordion>
      <AccordionSummary
        className="ServerConfigGroupHeader"
        expandIcon={<SvgIcon path={mdiUnfoldMoreHorizontal} />}
      >
        <div className="ServerConfigGroupHeader-contents">
          <Typography>{schema.title}</Typography>
          <Typography color="textSecondary">{schema.description}</Typography>
        </div>
        {edited ? (
          <div className="ServerConfigGroupHeader-saveWarning">
            <SvgIcon path={mdiAlert} style={{ marginRight: '.25rem' }} />
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
          disabled={!edited || save.loading}
          startIcon={startIcon}
          onClick={save.execute}
        >
          {save.status === 'success' ? t('admin.config.saved') : t('admin.config.save')}
        </Button>
      </AccordionActions>
    </Accordion>
  );
}

function renderSections(
  allSchema: JSONSchema7,
  allValues: JSONSchema7Object,
  onSave: (key: string, value: JSONSchema7Object) => Promise<void>,
) {
  if (allSchema.properties == null) {
    return null;
  }

  // Some casting: at the top level we know all properties are other schema objects
  return Object.entries(allSchema.properties).map(([key, schema]) => (
    <Section
      key={key}
      schema={schema as JSONSchema7}
      defaultValue={allValues[key] as JSONSchema7Object}
      onSave={onSave.bind(null, key)} // eslint-disable-line react/jsx-no-bind
    />
  ));
}

type ServerConfigProps = {
  config: JSONSchema7Object,
  configSchema: JSONSchema7,
  onSaveConfig: (key: string, value: JSONSchema7Object) => Promise<void>,
};
function ServerConfig({
  config,
  configSchema,
  onSaveConfig,
}: ServerConfigProps) {
  return (
    <div>
      {configSchema ? (
        renderSections(configSchema, config, onSaveConfig)
      ) : null}
    </div>
  );
}

export default ServerConfig;
