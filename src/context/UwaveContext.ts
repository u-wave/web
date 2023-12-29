import { createContext, useContext } from 'react';
import type Uwave from '../Uwave';

const UwaveContext = createContext<Uwave | null>(null);

export function useUwave() {
  return useContext(UwaveContext)!;
}

export default UwaveContext;
