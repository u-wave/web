/** @typedef {import('../reducers/config').State} Config */

export default function readApplicationConfig(container = '#u-wave-config') {
  /** @type {Config} */
  const config = {
    roles: undefined,
    emoji: {},
  };

  try {
    Object.assign(config, JSON.parse(document.querySelector(container).textContent));
  } catch {
    // ignore
  }

  return config;
}
