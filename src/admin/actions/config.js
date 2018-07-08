import { get, put } from '../../actions/RequestActionCreators';
import {
  LOAD_CONFIG_SCHEMA_START,
  LOAD_CONFIG_SCHEMA_COMPLETE,
  LOAD_CONFIG_START,
  LOAD_CONFIG_COMPLETE,
  SAVE_CONFIG_START,
  SAVE_CONFIG_COMPLETE,
} from '../constants/ActionTypes';

export function loadConfig() {
  return get('/server/config', {
    qs: { schema: true },
    onStart: () => (dispatch) => {
      dispatch({ type: LOAD_CONFIG_START });
      dispatch({ type: LOAD_CONFIG_SCHEMA_START });
    },
    onComplete: res => (dispatch) => {
      dispatch({
        type: LOAD_CONFIG_SCHEMA_COMPLETE,
        payload: res.meta.schema,
      });
      dispatch({
        type: LOAD_CONFIG_COMPLETE,
        payload: res.data,
      });
    },
  });
}

export function saveConfig(key, values) {
  return put(`/server/config/${key}`, values, {
    onStart: () => ({ type: SAVE_CONFIG_START }),
    onComplete: res => ({
      type: SAVE_CONFIG_COMPLETE,
      payload: res.data,
    }),
  });
}
