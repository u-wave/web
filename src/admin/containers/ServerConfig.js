import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ServerConfig from '../components/ServerConfig';
import { loadConfig, saveConfig } from '../actions/config';
import { configSelector, configSchemaSelector } from '../selectors/configSelectors';

const {
  useEffect,
} = React;

function ServerConfigContainer() {
  const config = useSelector(configSelector);
  const configSchema = useSelector(configSchemaSelector);
  const dispatch = useDispatch();
  const onSaveConfig = (key, value) => dispatch(saveConfig(key, value));

  useEffect(() => {
    dispatch(loadConfig());
  }, []);

  return (
    <ServerConfig
      config={config}
      configSchema={configSchema}
      onSaveConfig={onSaveConfig}
    />
  );
}

export default ServerConfigContainer;
