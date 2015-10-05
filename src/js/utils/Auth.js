import { loginComplete } from '../actions/LoginActionCreators';
import { post } from './Request';

const debug = require('debug')('uwave:utils:auth');

export function login({ email, password }) {
  return post('/v1/auth/login', { email, password })
    .then(res => res.json())
    .then(res => {
      loginComplete(res);
      return res;
    });
}

export function register({ email, username, password }) {
  return post('/v1/auth/register', { email, username, password, passwordRepeat: password })
    .then(res => res.json())
    .then(user => {
      debug('registered', user);
      return login({ email, password });
    });
}
