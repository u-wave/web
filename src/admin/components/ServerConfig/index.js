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

const Section = ({ schema }) => (
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
        unwrapRoot={schema.type === 'object'}
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
};

function renderSections(allSchema) {
  return Object.keys(allSchema.properties).map(key => (
    <Section key={key} schema={allSchema.properties[key]} />
  ));
}

const ServerConfig = ({
  configSchema,
}) => (
  <div>
    {configSchema ? (
      renderSections(configSchema)
    ) : (
      <p>
        Loading
      </p>
    )}
  </div>
);

ServerConfig.propTypes = {
  configSchema: PropTypes.object,
};

export default ServerConfig;
