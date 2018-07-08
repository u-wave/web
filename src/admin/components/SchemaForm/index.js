/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import Form from '../../../components/Form';
import TextField from '../../../components/Form/TextField';

function renderObjectProperties(spec, renderChild) {
  return Object.keys(spec.properties).map((key) => {
    const subSchema = spec.properties[key];

    return (
      <FormGroup style={{ marginBottom: 24 }}>{renderChild(subSchema)}</FormGroup>
    );
  });
}

const renderers = {
  object(spec, renderChild) {
    const children = renderObjectProperties(spec, renderChild);
    return (
      <FormControl component="fieldset">
        {spec.title && <FormLabel component="legend">{spec.title}</FormLabel>}
        {spec.description && <FormHelperText>{spec.description}</FormHelperText>}
        {children}
      </FormControl>
    );
  },
  textarea(schema) {
    return (
      <React.Fragment>
        <Typography component="p">{schema.title}</Typography>
        <textarea />
        {schema.description && <FormHelperText>{schema.description}</FormHelperText>}
      </React.Fragment>
    );
  },
  string(schema) {
    return (
      <React.Fragment>
        <Typography>{schema.title}</Typography>
        <TextField />
        {schema.description && <FormHelperText>{schema.description}</FormHelperText>}
      </React.Fragment>
    );
  },
  number(schema) {
    return (
      <React.Fragment>
        <Typography>{schema.title}</Typography>
        <TextField type="number" />
        {schema.description && <FormHelperText>{schema.description}</FormHelperText>}
      </React.Fragment>
    );
  },
  boolean(schema) {
    return (
      <React.Fragment>
        <FormControlLabel
          control={<Checkbox />}
          label={schema.title}
        />
        {schema.description && <FormHelperText>{schema.description}</FormHelperText>}
      </React.Fragment>
    );
  },
};

export default class SchemaForm extends React.Component {
  static propTypes = {
    schema: PropTypes.object.isRequired,
    unwrapRoot: PropTypes.bool,
  };

  static defaultProps = {
    unwrapRoot: false,
  };

  renderField(schema) {
    const controlName = schema['uw:control'] || schema.type;
    const renderer = renderers[controlName];
    if (renderer) {
      return renderer(schema, this.renderField.bind(this));
    }
    return (
      <p style={{ background: 'red', color: 'white'}}>
        Unknown:
        {controlName}
      </p>
    );
  }

  render() {
    const { schema, unwrapRoot } = this.props;

    const form = unwrapRoot
      ? renderObjectProperties(schema, this.renderField.bind(this))
      : this.renderField(schema);

    return (
      <Form>
        {form}
      </Form>
    );
  }
}
