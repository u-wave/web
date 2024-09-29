import type { State as Config } from '../reducers/config';

export default function readApplicationConfig(container = '#u-wave-config') {
  const config: Config = {
    roles: undefined,
    emoji: {},
  };

  try {
    Object.assign(config, JSON.parse(document.querySelector(container)?.textContent ?? '{}'));
  } catch {
    // ignore
  }

  if (import.meta.env.VITE_DEMO) {
    const url = new URL(window.location.href);
    config.apiUrl = url.searchParams.get('apiUrl') ?? 'https://u-wave-demo.fly.dev/api';
    config.socketUrl = url.searchParams.get('socketUrl') ?? 'wss://u-wave-demo.fly.dev';
  }

  return config;
}
