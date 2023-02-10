import React from 'react';

const {
  createContext,
  useContext,
} = React;

const UwaveContext = createContext(null);

export function useUwave() {
  return useContext(UwaveContext);
}

export default UwaveContext;
