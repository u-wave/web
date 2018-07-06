/* eslint-disable import/prefer-default-export */
import { get } from '../../actions/RequestActionCreators';
import {
  LOAD_CONFIG_SCHEMA_START,
  LOAD_CONFIG_SCHEMA_COMPLETE,
} from '../constants/ActionTypes';

export function loadConfigSchema() {
  return get('/server/config/schema', {
    onStart: () => ({ type: LOAD_CONFIG_SCHEMA_START }),
    onComplete: res => ({
      type: LOAD_CONFIG_SCHEMA_COMPLETE,
      payload: res.data,
    }),
  });
}
