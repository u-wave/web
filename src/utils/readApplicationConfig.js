import { initialState } from '../reducers/config';

export default function readApplicationConfig(container = '#u-wave-config') {
  const config = { ...initialState };

  try {
    Object.assign(config, JSON.parse(document.querySelector(container).textContent));
  } catch {
    // ignore
  }

  return config;
}
