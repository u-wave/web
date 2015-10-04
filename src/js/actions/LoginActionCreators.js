import { dispatch } from '../dispatcher';
import { post } from '../utils/Request';

const debug = require('debug')('uwave:actions:login');

export function loginComplete({ jwt, user }) {
  dispatch({
    action: 'loginComplete',
    jwt, user
  });
}

export function register({ email, username, password }) {
  post('/v1/auth/register', { email, username, password, passwordRepeat: password })
    .then(res => res.json())
    .then(user => {
      debug('registered', user);
    })
    .catch(err => {
      debug('registration failed', err);
    });
}

export function openLoginModal() {
  dispatch({
    action: 'openLoginModal'
  });
}
