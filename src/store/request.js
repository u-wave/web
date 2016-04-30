import assign from 'object-assign';
import { stringify as stringifyQS } from 'querystring';

import { REQUEST_START } from '../constants/actionTypes/request';
import {
  requestComplete,
  requestCompleteError
} from '../actions/RequestActionCreators';
import { requestOptionsSelector } from '../selectors/configSelectors';
import { tokenSelector } from '../selectors/userSelectors';

function makeUrl(token, path, params = {}) {
  let uri = path;

  const query = token ? { token, ...params } : params;
  if (query) {
    // heh…
    uri += (uri.indexOf('?') !== -1 ? '&' : '?') + stringifyQS(query);
  }

  return uri;
}

function rejectNonOK(response) {
  if (response.status !== 200) {
    return response.json().then(message => {
      const error = assign(new Error(message), { response });
      return Promise.reject(error);
    });
  }
  return response;
}

const defaultOptions = {
  apiUrl: '/v1'
};

export default function middleware(middlewareOptions = {}) {
  return ({ dispatch, getState }) => next => action => {
    if (action.type !== REQUEST_START) {
      return next(action);
    }

    const opts = {
      ...defaultOptions,
      ...middlewareOptions,
      ...requestOptionsSelector(getState())
    };

    const token = tokenSelector(getState());
    const { method, url, qs, data } = action.payload;
    const {
      id,
      onStart,
      onComplete,
      onError
    } = action.meta;

    const completedMeta = {
      id,
      method, url, qs, data
    };

    const requestUrl = makeUrl(token, opts.apiUrl + url, qs);

    const requestOptions = {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin'
    };

    if (method !== 'get') {
      requestOptions.body = JSON.stringify(data);
    }

    if (onStart) {
      dispatch(onStart());
    }

    return fetch(requestUrl, requestOptions)
      .then(rejectNonOK)
      .then(res => res.json())
      .then(res => {
        if (onComplete) {
          dispatch(onComplete(res));
        }
        dispatch(requestComplete(res, completedMeta));
        return res;
      })
      .catch(error => {
        if (onError) {
          dispatch(onError(error));
        }
        dispatch(requestCompleteError(error, completedMeta));
        throw error;
      });
  };
}
