import React from 'react';

const controls = new Map();

function renderChild({
  schema,
  value,
  onChange,
}) {
  const controlName = schema['uw:control'] || schema.type;
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
