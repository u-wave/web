import 'whatwg-fetch';
import assign from 'object-assign';
import { stringify as stringifyQS } from 'querystring';
import LoginStore from '../stores/LoginStore';

const debug = require('debug')('uwave:util:request');

function makeUrl(path, params = {}) {
  let uri = path;
  const token = LoginStore.getToken();

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

export function get(uri, data) {
  debug('get', uri, stringifyQS(data));
  return fetch(makeUrl(uri, data), {
    method: 'get',
    credentials: 'same-origin'
  }).then(rejectNonOK);
}

export function post(uri, data) {
  debug('post', uri, JSON.stringify(data));
  return fetch(makeUrl(uri), {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'same-origin',
    body: JSON.stringify(data)
  }).then(rejectNonOK);
}

export function put(uri, data) {
  debug('put', uri, JSON.stringify(data));
  return fetch(makeUrl(uri), {
    method: 'put',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'same-origin',
    body: JSON.stringify(data)
  }).then(rejectNonOK);
}

export function del(uri, data) {
  debug('del', uri, JSON.stringify(data));
  return fetch(makeUrl(uri), {
    method: 'delete',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'same-origin',
    body: JSON.stringify(data)
  }).then(rejectNonOK);
}
