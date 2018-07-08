import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SchemaForm from '../SchemaForm'; // eslint-disable-line

const Section = ({ schema, data, onSave }) => (
  <ExpansionPanel>
    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
      <div>
        <Typography>{schema.title}</Typography>
        <Typography color="textSecondary">{schema.description}</Typography>
      </div>
    </ExpansionPanelSummary>
    <ExpansionPanelDetails>
      <SchemaForm
        schema={schema}
        defaultData={data}
        unwrapRoot={schema.type === 'object'}
        onSave={onSave}
      />
    </ExpansionPanelDetails>
    <ExpansionPanelActions>
      <Button color="primary" variant="raised">Save</Button>
    </ExpansionPanelActions>
  </ExpansionPanel>
);

Section.propTypes = {
  schema: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  data: PropTypes.any.isRequired,
  onSave: PropTypes.func.isRequired,
};

function partial(fn, arg) {
  return (...args) => fn(arg, ...args);
}

function renderSections(allSchema, allValues, onSave) {
  return Object.keys(allSchema.properties).map(key => (
    <Section
      key={key}
      schema={allSchema.properties[key]}
      data={allValues[key]}
      onSave={partial(onSave, key)}
    />
  ));
}

const ServerConfig = ({
  config,
  configSchema,
  onSaveConfig,
}) => (
  <div>
    {configSchema ? (
      renderSections(configSchema, config, onSaveConfig)
    ) : (
      <p>
        Loading
      </p>
    )}
  </div>
);

ServerConfig.propTypes = {
  config: PropTypes,
  configSchema: PropTypes.object,
  onSaveConfig: PropTypes.func.isRequired,
};

export default ServerConfig;
