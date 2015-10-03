import { dispatch } from '../dispatcher';
import { post } from '../utils/Request';

const debug = require('debug')('uwave:actions:login');

function loginComplete({ jwt, user }) {
  dispatch({
    action: 'loginComplete',
    jwt, user
  });
}
function loginError(err) {
  dispatch({
    action: 'loginError',
    error: err,
    message: err.message
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

export function login({ email, password }) {
  post('/v1/auth/login', { email, password })
    .then(res => res.json())
    .then(loginComplete)
    .catch(loginError);
}
