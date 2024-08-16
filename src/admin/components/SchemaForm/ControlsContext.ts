import type { JSONSchema7, JSONSchema7Type } from 'json-schema';
import React from 'react';

export type ControlProps = {
  className?: string,
  schema: JSONSchema7,
  value: JSONSchema7Type,
  onChange: (value: JSONSchema7Type) => void,
};

export type ControlComponent = React.FC<ControlProps>;

export default React.createContext(
  new Map<string, ControlComponent>(),
);
