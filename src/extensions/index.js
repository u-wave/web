import extension from './extension';
import createApis from './api';

export default function createExtensions(store) {
  return {
    extension,
    ...createApis(store)
  };
}
