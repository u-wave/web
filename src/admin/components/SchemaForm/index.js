/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Form from '../../../components/Form';
import TextField from '../../../components/Form/TextField';

const renderers = {
  object(spec) {
    const children = Object.keys(spec.properties).map((key) => {
      return <Typography>{key}</Typography>;
    });
    return (
      <div>
        {spec.title && <Typography>{spec.title}</Typography>}
        {spec.description && <Typography>{spec.description}</Typography>}
        {children}
      </div>
    );
  },
  string: TextField,
};

export default class SchemaForm extends React.Component {
  static propTypes = {
    schema: PropTypes.object.isRequired,
  };

  renderField(schema) {
    const renderer = renderers[schema.type];
    if (renderer) {
      return renderer(schema);
    }
  }

  render() {
    const { schema } = this.props;

    return (
      <Form>
        {this.renderField(schema)}
      </Form>
    );
  }
}
