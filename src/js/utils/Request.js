import 'whatwg-fetch';
import assign from 'object-assign';
import BluebirdPromise from 'bluebird';
import { stringify as stringifyQS } from 'querystring';
import LoginStore from '../stores/LoginStore';

// return Bluebird promises from native fetch calls, too
function fetch(...args) {
  return BluebirdPromise.resolve(window.fetch(...args));
}

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
  return fetch(makeUrl(uri, data), {
    method: 'get',
    credentials: 'same-origin'
  }).then(rejectNonOK);
}

export function post(uri, data) {
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
