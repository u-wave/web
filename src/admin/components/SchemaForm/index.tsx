import type { JSONSchema7, JSONSchema7Object } from 'json-schema';
import Form from '../../../components/Form';
import ArrayField from './ArrayField';
import BooleanField from './BooleanField';
import ControlsContext, { type ControlComponent } from './ControlsContext';
import EnumField from './EnumField';
import MarkdownField from './MarkdownField';
import NumberField from './NumberField';
import ObjectField, { ObjectProperties } from './ObjectField';
import StringField from './StringField';

const controls = new Map<string, ControlComponent>([
  ['array', ArrayField as ControlComponent],
  ['boolean', BooleanField as ControlComponent],
  ['number', NumberField as ControlComponent],
  ['object', ObjectField as ControlComponent],
  ['string', StringField as ControlComponent],
  ['enum', EnumField as ControlComponent],
  ['markdown', MarkdownField as ControlComponent],
]);

type SchemaFormProps = {
  schema: JSONSchema7,
  value: JSONSchema7Object,
  onChange: (value: JSONSchema7Object) => void,
  unwrapRoot?: boolean,
};
function SchemaForm({
  schema,
  value,
  onChange,
  unwrapRoot = false,
}: SchemaFormProps) {
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

export default SchemaForm;
