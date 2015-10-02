import 'whatwg-fetch';
import assign from 'object-assign';
import LoginStore from '../stores/LoginStore';

function makeUrl(path) {
  let uri = path;
  const token = LoginStore.getToken();
  if (token) {
    // heh…
    if (uri.indexOf('?') !== -1) {
      uri += `&token=${token}`;
    } else {
      uri += `?token=${token}`;
    }
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

export function get(uri) {
  return fetch(makeUrl(uri), {
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
