import {
  REQUEST_START,
  REQUEST_COMPLETE,
} from '../constants/ActionTypes';

let requestID = 0;
function request(method, url, opts = {}) {
  const {
    onStart,
    onComplete,
    onError,
    signal,
    ...requestOpts
  } = opts;

  requestID += 1;

  return {
    type: REQUEST_START,
    payload: {
      ...requestOpts,
      method,
      url,
    },
    meta: {
      onStart,
      onComplete,
      onError,
      signal,
      id: requestID,
    },
  };
}

export function requestComplete(response, meta) {
  return {
    type: REQUEST_COMPLETE,
    payload: response,
    meta,
  };
}

export function requestCompleteError(error, meta) {
  return {
    type: REQUEST_COMPLETE,
    error: true,
    payload: error,
    meta,
  };
}

export const post = (url, data, opts = {}) => request('post', url, { data, ...opts });
