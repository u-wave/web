import React from 'react';
import { useDispatch } from 'react-redux';
import { get, put } from '../../actions/RequestActionCreators';
import ServerConfig from '../components/ServerConfig';

const {
  useCallback,
  useEffect,
  useState,
} = React;

function ServerConfigContainer() {
  const [config, setConfig] = useState({});
  const [configSchema, setConfigSchema] = useState(null);

  const dispatch = useDispatch();
  const handleSaveConfig = useCallback((key, value) => {
    const request = put(`/server/config/${key}`, value);
    return dispatch(request);
  }, [dispatch]);

  useEffect(() => {
    const controller = new AbortController();
    const request = get('/server/config', {
      qs: { schema: true },
      signal: controller.signal,
    });

    dispatch(request).then(({ data, meta }) => {
      setConfig(data);
      setConfigSchema(meta.schema);
    });

    return () => {
      controller.abort();
    };
  }, [dispatch]);

  return (
    <ServerConfig
      config={config}
      configSchema={configSchema}
      onSaveConfig={handleSaveConfig}
    />
  );
}

export default ServerConfigContainer;
