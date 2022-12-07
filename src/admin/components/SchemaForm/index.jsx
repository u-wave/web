import React from 'react';
import PropTypes from 'prop-types';
import Form from '../../../components/Form';
import ControlsContext from './ControlsContext';
import ArrayField from './ArrayField';
import BooleanField from './BooleanField';
import NumberField from './NumberField';
import ObjectField, { ObjectProperties } from './ObjectField';
import StringField from './StringField';
import MarkdownField from './MarkdownField';
import EnumField from './EnumField';

const controls = new Map([
  ['array', ArrayField],
  ['boolean', BooleanField],
  ['number', NumberField],
  ['object', ObjectField],
  ['string', StringField],
  ['enum', EnumField],
  ['markdown', MarkdownField],
]);

function SchemaForm({
  schema,
  value,
  onChange,
  unwrapRoot = false,
}) {
  const form = unwrapRoot
    ? <ObjectProperties schema={schema} value={value} onChange={onChange} />
    : <ObjectField schema={schema} value={value} onChange={onChange} />;

  return (
    <Form>
      <ControlsContext.Provider value={controls}>
        {form}
      </ControlsContext.Provider>
    </Form>
  );
}

SchemaForm.propTypes = {
  schema: PropTypes.object.isRequired,
  value: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  unwrapRoot: PropTypes.bool,
};

export default SchemaForm;
