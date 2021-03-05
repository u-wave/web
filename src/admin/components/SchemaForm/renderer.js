import React from 'react';

const controls = new Map();

function getControlName(schema) {
  if (schema['uw:control']) {
    return schema['uw:control'];
  }

  if (Array.isArray(schema.enum)) {
    return 'enum';
  }

  return schema.type;
}

function renderChild({
  schema,
  value,
  onChange,
}) {
  const controlName = getControlName(schema);
  const renderer = controls.get(controlName);;
  if (renderer) {
    return renderer(schema, props, renderChild);
  }
  return (
    <p style={{ background: 'red', color: 'white'}}>
      Unknown:
      {controlName}
    </p>
  );
}

export function useRenderer() {
  return {
    renderChild,
  };
}

export function registerControl(name, component) {
  controls.set(name, component);
}
