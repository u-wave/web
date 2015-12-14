import assign from 'object-assign';
import { stringify as stringifyQS } from 'querystring';

const debug = require('debug')('uwave:util:request');

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

export function get(token, uri, data) {
  debug('get', uri, stringifyQS(data));
  return fetch(makeUrl(token, uri, data), {
    method: 'get',
    credentials: 'same-origin'
  }).then(rejectNonOK);
}

export function post(token, uri, data) {
  debug('post', uri, JSON.stringify(data));
  return fetch(makeUrl(token, uri), {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'same-origin',
    body: JSON.stringify(data)
  }).then(rejectNonOK);
}

export function put(token, uri, data) {
  debug('put', uri, JSON.stringify(data));
  return fetch(makeUrl(token, uri), {
    method: 'put',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'same-origin',
    body: JSON.stringify(data)
  }).then(rejectNonOK);
}

export function del(token, uri, data) {
  debug('del', uri, JSON.stringify(data));
  return fetch(makeUrl(token, uri), {
    method: 'delete',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'same-origin',
    body: JSON.stringify(data)
  }).then(rejectNonOK);
}
