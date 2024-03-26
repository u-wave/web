import React from 'react';
import useSWR from 'swr';
import uwFetch from '../../utils/fetch';
import ServerConfig from '../components/ServerConfig';

const {
  useCallback,
} = React;

function ServerConfigContainer() {
  const { data, mutate } = useSWR(['/server/config?schema'], { suspense: true });
  const {
    data: config,
    meta: { schema: configSchema },
  } = data;

  const handleSaveConfig = useCallback(async (key, value) => {
    await uwFetch([`/server/config/${key}`, { method: 'put', data: value }]);
    mutate();
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
