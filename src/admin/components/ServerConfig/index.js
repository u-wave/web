import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionActions from '@material-ui/core/AccordionActions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SchemaForm from '../SchemaForm'; // eslint-disable-line

class Section extends React.Component {
  static propTypes = {
    schema: PropTypes.shape({
      type: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    }).isRequired,
    defaultValue: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      // eslint-disable-next-line react/destructuring-assignment
      value: this.props.defaultValue,
    };
  }

  handleChange = (value) => {
    this.setState({ value });
  };

  handleSubmit = (event) => {
    const { value } = this.state;
    const { onSave } = this.props;

    event.preventDefault();

    onSave(value);
  };

  render() {
    const { value } = this.state;
    const { schema } = this.props;

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
            onChange={this.handleChange}
          />
        </AccordionDetails>
        <AccordionActions>
          <Button
            color="primary"
            variant="raised"
            onClick={this.handleSubmit}
          >
            Save
          </Button>
        </AccordionActions>
      </Accordion>
    );
  }
}

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
  config: PropTypes.object,
  configSchema: PropTypes.object,
  onSaveConfig: PropTypes.func.isRequired,
};

export default ServerConfig;
