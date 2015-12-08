import { dispatch } from '../dispatcher';
import { get, post } from '../utils/Request';
import * as Session from '../utils/Session';
import * as Socket from '../utils/Socket';
import { advance } from './AdvanceActionCreators';
import { setPlaylists, selectPlaylist } from './PlaylistActionCreators';
import { setUsers } from './UserActionCreators';

const debug = require('debug')('uwave:actions:login');

export function loginComplete({ jwt, user }) {
  Socket.auth(jwt);
  return {
    type: 'loginComplete',
    payload: { jwt, user }
  };
}

export function initState() {
  return (dispatch, getState) => {
    const jwt = getState().auth.jwt;
    dispatch({ type: 'loadingPlaylists' });
    get(jwt, '/v1/now')
      .then(res => res.json())
      .then(state => {
        dispatch(setUsers(state.users || []));
        dispatch(setPlaylists(state.playlists || []));
        if (state.booth) {
          // TODO don't set this when logging in _after_ entering the page?
          dispatch(advance(state.booth));
        }
        if (state.user) {
          const token = getState().auth.jwt;
          dispatch(loginComplete({
            jwt: token,
            user: state.user
          }));
        }
        if (state.activePlaylist) {
          dispatch({
            type: 'activatedPlaylist',
            payload: { playlistID: state.activePlaylist }
          });
          dispatch(selectPlaylist(state.activePlaylist));
        }
      });
  };
}

export function setJWT(jwt) {
  return {
    type: 'setSession',
    payload: { jwt }
  };
}

export function login({ email, password }) {
  return (dispatch, getState) => {
    const jwt = getState().auth.jwt;
    post(jwt, '/v1/auth/login', { email, password })
      .then(res => res.json())
      .then(res => {
        Session.set(res.jwt);
        dispatch(setJWT(res.jwt));
        dispatch(initState());
        return res;
      })
      .catch(error => {
        dispatch({
          type: 'loginComplete',
          error: true,
          payload: error
        });
      });
  };
}

export function register({ email, username, password }) {
  return (dispatch, getState) => {
    const jwt = getState().auth.jwt;
    dispatch({ type: 'registerStart' });
    post(jwt, '/v1/auth/register', { email, username, password, passwordRepeat: password })
      .then(res => res.json())
      .then(user => {
        debug('registered', user);
        dispatch({
          type: 'registerComplete',
          payload: { user }
        });
        dispatch(login({ email, password }));
      })
      .catch(err => {
        debug('registration failed', err);
        dispatch({
          type: 'registerComplete',
          error: true,
          payload: err
        });
      });
  };
}

function logoutComplete() {
  return dispatch => {
    dispatch({ type: 'logoutComplete' });
    setPlaylists([]);
  };
}

export function logout() {
  return (dispatch, getState) => {
    const jwt = getState().auth.jwt;
    const me = getState().auth.user;
    if (me) {
      dispatch({ type: 'logoutStart' });
      del(jwt, `/v1/auth/session/${me._id}`)
        .then(logoutComplete)
        .catch(logoutComplete)
        .then(dispatch);
    } else {
      dispatch(logoutComplete());
    }
    Session.unset();
  };
}

export function openLoginModal() {
  return {
    type: 'openLoginModal',
    meta: {
      register: false
    }
  };
}
export function openRegisterModal() {
  return {
    type: 'openLoginModal',
    meta: {
      register: true
    }
  };
}
