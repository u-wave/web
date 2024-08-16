import { useCallback } from 'react';
import useSWR from 'swr';
import type { JSONSchema7Object } from 'json-schema';
import uwFetch from '../../utils/fetch';
import ServerConfig from '../components/ServerConfig';

function ServerConfigContainer() {
  const { data, mutate } = useSWR(['/server/config?schema'], { suspense: true });
  const {
    data: config,
    meta: { schema: configSchema },
  } = data;

  const handleSaveConfig = useCallback(async (key: string, value: JSONSchema7Object) => {
    await uwFetch([`/server/config/${key}`, { method: 'put', data: value }]);
    await mutate();
  }, [mutate]);

  return (
    <ServerConfig
      config={config}
      configSchema={configSchema}
      onSaveConfig={handleSaveConfig}
    />
  );
}

export default ServerConfigContainer;
