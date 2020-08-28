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

function renderObjectProperties(spec, { value, onChange }, renderChild) {
  return Object.keys(spec.properties).map((key) => {
    const subSchema = spec.properties[key];
    const subValue = value[key];
    const subChange = newValue => onChange({
      ...value,
      [key]: newValue,
    });

    return (
      <FormGroup>
        {renderChild(subSchema, {
          value: subValue,
          onChange: subChange,
        })}
      </FormGroup>
    );
  });
}

const renderers = {
  object(spec, props, renderChild) {
    const children = renderObjectProperties(spec, props, renderChild);
    return (
      <FormControl component="fieldset">
        {spec.title && <FormLabel component="legend">{spec.title}</FormLabel>}
        {spec.description && <FormHelperText>{spec.description}</FormHelperText>}
        {children}
      </FormControl>
    );
  },
  textarea(schema, { value, onChange }) {
    return (
      <>
        <Typography component="p">{schema.title}</Typography>
        <textarea
          value={value}
          onChange={e => onChange(e.target.value)}
        />
        {schema.description && <FormHelperText>{schema.description}</FormHelperText>}
      </>
    );
  },
  string(schema, { value, onChange }) {
    return (
      <>
        {schema.title && <Typography gutterBottom>{schema.title}</Typography>}
        <TextField
          value={value}
          onChange={e => onChange(e.target.value)}
        />
        {schema.description && <FormHelperText>{schema.description}</FormHelperText>}
      </>
    );
  },
  number(schema, { value, onChange }) {
    return (
      <>
        {schema.title && <Typography gutterBottom>{schema.title}</Typography>}
        <TextField
          type="number"
          value={value}
          onChange={e => onChange(e.target.value)}
        />
        {schema.description && <FormHelperText>{schema.description}</FormHelperText>}
      </>
    );
  },
  boolean(schema, { value, onChange }) {
    return (
      <>
        <FormControlLabel
          control={
            <Checkbox
              checked={value}
              onChange={(event, checked) => onChange(checked)}
            />
          }
          label={schema.title}
        />
        {schema.description && <FormHelperText>{schema.description}</FormHelperText>}
      </>
    );
  },
  array(schema, { value, onChange }, renderChild) {
    return (
      <>
        <Typography gutterBottom>{schema.title}</Typography>
        {value.map((subValue, index) => (
          renderChild(schema.items, {
            value: subValue,
            onChange: (newValue) => onChange([
              ...value.slice(0, index),
              newValue,
              ...value.slice(index + 1),
            ]),
          })
        ))}
        {schema.description && <FormHelperText>{schema.description}</FormHelperText>}
      </>
    );
  }
};

export default class SchemaForm extends React.Component {
  static propTypes = {
    schema: PropTypes.object.isRequired,
    value: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    unwrapRoot: PropTypes.bool,
  };

  static defaultProps = {
    unwrapRoot: false,
  };

  renderField(schema, props) {
    const controlName = schema['uw:control'] || schema.type;
    const renderer = renderers[controlName];
    if (renderer) {
      return renderer(schema, props, this.renderField.bind(this));
    }
    return (
      <p style={{ background: 'red', color: 'white'}}>
        Unknown:
        {controlName}
      </p>
    );
  }

  render() {
    const {
      schema,
      unwrapRoot,
      value,
      onChange,
    } = this.props;

    const form = unwrapRoot
      ? renderObjectProperties(schema, {
          value,
          onChange,
        }, this.renderField.bind(this))
      : this.renderField(schema, value);

    return (
      <Form>
        {form}
      </Form>
    );
  }
}
