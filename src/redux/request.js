import qsStringify from 'qs-stringify';
import { REQUEST_START } from '../constants/ActionTypes';
import {
  requestComplete,
  requestCompleteError,
} from '../actions/RequestActionCreators';
import { requestOptionsSelector } from '../reducers/config';
import { tokenSelector } from '../reducers/auth';

function isEmpty(object) {
  return !object || Object.keys(object).length === 0;
}

function makeUrl(path, params = {}) {
  let uri = path;

  if (!isEmpty(params)) {
    // heh…
    uri += (uri.includes('?') ? '&' : '?') + qsStringify(params);
  }

  return uri;
}

function rejectNonOK(response) {
  if (response.status !== 200) {
    return response.json().then((res) => {
      if (!('errors' in res)) {
        throw new Error('An unknown error occurred.');
      }
      const { errors } = res;
      const error = new Error(errors.map((err) => err.title).join(', '));
      error.response = response;
      error.errors = errors;
      throw error;
    }, (error) => {
      const pathname = response.url.replace(window.location.origin, '').replace(/\?.*$/, '');
      const newError = new Error(`Invalid response from ${pathname}, please try again later.`);
      newError.response = response;
      newError.cause = error;
      throw newError;
    });
  }
  return response;
}

const defaultOptions = {
  apiUrl: '/api',
};

export default function middleware(middlewareOptions = {}) {
  return ({ dispatch, getState }) => (next) => (action) => {
    if (action.type !== REQUEST_START) {
      return next(action);
    }

    const opts = {
      ...defaultOptions,
      ...middlewareOptions,
      ...requestOptionsSelector(getState()),
    };

    const token = tokenSelector(getState());
    const {
      method,
      url,
      qs,
      data,
    } = action.payload;
    const {
      id,
      signal,
      onStart,
      onComplete,
      onError,
    } = action.meta;

    const completedMeta = {
      id,
      method,
      url,
      qs,
      data,
    };

    const requestUrl = makeUrl(opts.apiUrl + url, qs);

    const headers = new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    });

    if (token && token !== 'cookie') {
      headers.append('Authorization', `JWT ${token}`);
    }

    /** @type {RequestInit} */
    const requestOptions = {
      method,
      headers,
      credentials: 'same-origin',
      signal,
    };

    if (method !== 'get') {
      requestOptions.body = JSON.stringify(data);
    }

    if (onStart) {
      dispatch(onStart());
    }

    return fetch(requestUrl, requestOptions)
      .then(rejectNonOK)
      .then((res) => res.json())
      .then((res) => {
        let responseValue = res;
        if (onComplete) {
          responseValue = dispatch(onComplete(responseValue));
        }
        dispatch(requestComplete(res, completedMeta));
        return responseValue;
      })
      .catch((error) => {
        if (onError) {
          dispatch(onError(error));
        }
        dispatch(requestCompleteError(error, completedMeta));
        throw error;
      });
  };
}
