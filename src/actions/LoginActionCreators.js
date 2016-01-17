import {
  REGISTER_START, REGISTER_COMPLETE,
  LOGIN_START, LOGIN_COMPLETE, SET_TOKEN,
  LOGOUT_START, LOGOUT_COMPLETE
} from '../constants/actionTypes/auth';
import {
  LOAD_ALL_PLAYLISTS_START,
  ACTIVATE_PLAYLIST_COMPLETE
} from '../constants/actionTypes/playlists';
import { get, post } from '../utils/Request';
import * as Session from '../utils/Session';
import * as Socket from '../utils/Socket';
import { advance } from './BoothActionCreators';
import { setPlaylists, selectPlaylist } from './PlaylistActionCreators';
import { closeLoginDialog } from './DialogActionCreators';
import { setUsers } from './UserActionCreators';
import { currentUserSelector, tokenSelector } from '../selectors/userSelectors';

const debug = require('debug')('uwave:actions:login');

export function loginComplete({ jwt, user }) {
  Socket.auth(jwt);
  return dispatch => {
    dispatch({
      type: LOGIN_COMPLETE,
      payload: { jwt, user }
    });
    dispatch(closeLoginDialog());
  };
}

export function initState() {
  return (dispatch, getState) => {
    const jwt = tokenSelector(getState());
    dispatch({ type: LOAD_ALL_PLAYLISTS_START });
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
          const token = tokenSelector(getState());
          dispatch(loginComplete({
            jwt: token,
            user: state.user
          }));
        }
        if (state.activePlaylist) {
          dispatch({
            type: ACTIVATE_PLAYLIST_COMPLETE,
            payload: { playlistID: state.activePlaylist }
          });
          dispatch(selectPlaylist(state.activePlaylist));
        }
      });
  };
}

export function setJWT(jwt) {
  return {
    type: SET_TOKEN,
    payload: { jwt }
  };
}

export function login({ email, password }) {
  return (dispatch, getState) => {
    const jwt = tokenSelector(getState());
    dispatch({ type: LOGIN_START });
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
          type: LOGIN_COMPLETE,
          error: true,
          payload: error
        });
      });
  };
}

export function register({ email, username, password }) {
  return (dispatch, getState) => {
    const jwt = tokenSelector(getState());
    dispatch({ type: REGISTER_START });
    post(jwt, '/v1/auth/register', { email, username, password, passwordRepeat: password })
      .then(res => res.json())
      .then(user => {
        debug('registered', user);
        dispatch({
          type: REGISTER_COMPLETE,
          payload: { user }
        });
        dispatch(login({ email, password }));
      })
      .catch(err => {
        debug('registration failed', err);
        dispatch({
          type: REGISTER_COMPLETE,
          error: true,
          payload: err
        });
      });
  };
}

function logoutComplete() {
  return dispatch => {
    dispatch({ type: LOGOUT_COMPLETE });
    setPlaylists([]);
  };
}

export function logout() {
  return (dispatch, getState) => {
    const jwt = tokenSelector(getState());
    const me = currentUserSelector(getState());
    if (me) {
      dispatch({ type: LOGOUT_START });
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
