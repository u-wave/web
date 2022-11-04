import React from 'react';
import useSWR from 'swr';
import { useDispatch } from 'react-redux';
import { put } from '../../actions/RequestActionCreators';
import ServerConfig from '../components/ServerConfig';

const {
  useCallback,
} = React;

function ServerConfigContainer() {
  const { data, mutate } = useSWR('/server/config?schema', { suspense: true });
  const {
    data: config,
    meta: { schema: configSchema },
  } = data;

  const dispatch = useDispatch();
  const handleSaveConfig = useCallback(async (key, value) => {
    const request = put(`/server/config/${key}`, value);
    await dispatch(request);
    mutate();
  }, [dispatch, mutate]);

  return (
    <ServerConfig
      config={config}
      configSchema={configSchema}
      onSaveConfig={handleSaveConfig}
    />
  );
}

export default ServerConfigContainer;
