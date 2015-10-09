import { dispatch } from '../dispatcher';
import { get, post } from '../utils/Request';
import { setPlaylists } from './PlaylistActionCreators';

const debug = require('debug')('uwave:actions:login');

export function initState() {
  get('/v1/now')
    .then(res => res.json())
    .then(state => {
      setPlaylists(state.playlists);
    });
}

export function loginComplete({ jwt, user }) {
  dispatch({
    action: 'loginComplete',
    jwt, user
  });

  initState();
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
    action: 'openLoginModal',
    register: false
  });
}
export function openRegisterModal() {
  dispatch({
    action: 'openLoginModal',
    register: true
  });
}
