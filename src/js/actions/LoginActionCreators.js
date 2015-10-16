import { dispatch } from '../dispatcher';
import { get, post } from '../utils/Request';
import LoginStore from '../stores/LoginStore';
import { setPlaylists } from './PlaylistActionCreators';
import { setUsers } from './UserActionCreators';

const debug = require('debug')('uwave:actions:login');

export function loginComplete({ jwt, user }) {
  dispatch({
    type: 'loginComplete',
    payload: { jwt, user }
  });
  localStorage._session = jwt;
}

export function initState() {
  dispatch({ type: 'loadingPlaylists' });
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

export function setJWT(jwt) {
  dispatch({
    type: 'setSession',
    payload: { jwt }
  });
  initState();
}

export function login({ email, password }) {
  return post('/v1/auth/login', { email, password })
    .then(res => res.json())
    .then(res => {
      setJWT(res.jwt);
      return res;
    })
    .catch(error => {
      dispatch({
        type: 'loginComplete',
        error: true,
        payload: error
      });
    });
}

export function register({ email, username, password }) {
  dispatch({ type: 'registerStart' });
  post('/v1/auth/register', { email, username, password, passwordRepeat: password })
    .then(res => res.json())
    .then(user => {
      debug('registered', user);
      dispatch({
        type: 'registerComplete',
        payload: { user }
      });
      login({ email, password });
    })
    .catch(err => {
      debug('registration failed', err);
      dispatch({
        type: 'registerComplete',
        error: true,
        payload: err
      });
    });
}

export function openLoginModal() {
  dispatch({
    type: 'openLoginModal',
    meta: {
      register: false
    }
  });
}
export function openRegisterModal() {
  dispatch({
    type: 'openLoginModal',
    meta: {
      register: true
    }
  });
}
