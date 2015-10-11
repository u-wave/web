import { dispatch } from '../dispatcher';
import { get, post } from '../utils/Request';
import LoginStore from '../stores/LoginStore';
import { setPlaylists } from './PlaylistActionCreators';
import { setUsers } from './UserActionCreators';

const debug = require('debug')('uwave:actions:login');

export function loginComplete({ jwt, user }) {
  dispatch({
    action: 'loginComplete',
    jwt, user
  });
  localStorage._session = jwt;
}

export function initState() {
  dispatch({ action: 'loadingPlaylists' });
  get('/v1/now')
    .then(res => res.json())
    .then(state => {
      setUsers(state.users || []);
      setPlaylists(state.playlists || []);
      if (state.user) {
        loginComplete({
          jwt: LoginStore.getToken(),
          user: state.user
        });
      }
    });
}

export function loginAuthenticated(data) {
  loginComplete(data);
  initState();
}

export function setJWT(jwt) {
  dispatch({
    action: 'setSession',
    jwt
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
