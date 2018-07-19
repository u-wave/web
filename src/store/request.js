import qsStringify from 'qs-stringify';
import { REQUEST_START } from '../constants/ActionTypes';
import {
  requestComplete,
  requestCompleteError,
} from '../actions/RequestActionCreators';
import { requestOptionsSelector } from '../selectors/configSelectors';
import { tokenSelector } from '../selectors/userSelectors';

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
      const error = Object.assign(new Error(errors.map(err => err.title).join(', ')), {
        response,
        errors,
      });
      throw error;
    });
  }
  return response;
}

const defaultOptions = {
  apiUrl: '/api',
};

export default function middleware(middlewareOptions = {}) {
  return ({ dispatch, getState }) => next => (action) => {
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

    const requestOptions = {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
    };

    if (token && token !== 'cookie') {
      requestOptions.headers.Authorization = `JWT ${token}`;
    }

    if (method !== 'get') {
      requestOptions.body = JSON.stringify(data);
    }

    if (onStart) {
      dispatch(onStart());
    }

    return fetch(requestUrl, requestOptions)
      .then(rejectNonOK)
      .then(res => res.json())
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
