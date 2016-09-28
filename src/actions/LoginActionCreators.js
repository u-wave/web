import {
  INIT_STATE,
  SOCKET_CONNECT,
  SOCKET_RECONNECT,

  REGISTER_START,
  REGISTER_COMPLETE,
  LOGIN_START,
  LOGIN_COMPLETE,
  SET_TOKEN,
  LOGOUT_START,
  LOGOUT_COMPLETE
} from '../constants/actionTypes/auth';
import { LOAD_ALL_PLAYLISTS_START } from '../constants/actionTypes/playlists';
import * as Session from '../utils/Session';
import { get, post } from './RequestActionCreators';
import { advance, loadHistory } from './BoothActionCreators';
import { receiveMotd } from './ChatActionCreators';
import {
  setPlaylists, selectPlaylist, activatePlaylistComplete
} from './PlaylistActionCreators';
import { closeLoginDialog } from './DialogActionCreators';
import { syncTimestamps } from './TickerActionCreators';
import { setUsers } from './UserActionCreators';
import { setVoteStats } from './VoteActionCreators';
import { setWaitList } from './WaitlistActionCreators';
import { currentUserSelector, tokenSelector } from '../selectors/userSelectors';

const debug = require('debug')('uwave:actions:login');

export function socketConnect() {
  return { type: SOCKET_CONNECT };
}

export function socketReconnect() {
  return { type: SOCKET_RECONNECT };
}

export function loginComplete({ jwt, user }) {
  return (dispatch) => {
    dispatch({
      type: LOGIN_COMPLETE,
      payload: { jwt, user }
    });
    dispatch(closeLoginDialog());
  };
}

export function loadedState(state) {
  return (dispatch, getState) => {
    dispatch({
      type: INIT_STATE,
      payload: state
    });
    if (state.motd) {
      dispatch(receiveMotd(state.motd));
    }
    dispatch(setUsers(state.users || []));
    dispatch(setPlaylists(state.playlists || []));
    dispatch(setWaitList({
      waitlist: state.waitlist,
      locked: state.waitlistLocked
    }));
    if (state.booth && state.booth.historyID) {
      // TODO don't set this when logging in _after_ entering the page?
      dispatch(advance(state.booth));
      dispatch(setVoteStats(state.booth.stats));
    }
    if (state.user) {
      const token = tokenSelector(getState());
      dispatch(loginComplete({
        jwt: token,
        user: state.user
      }));
    }
    if (state.activePlaylist) {
      dispatch(activatePlaylistComplete(state.activePlaylist));
      dispatch(selectPlaylist(state.activePlaylist));
    }
  };
}

export function initState() {
  const beforeTime = Date.now();

  return get('/now', {
    onStart: () => ({ type: LOAD_ALL_PLAYLISTS_START }),
    onComplete: state => (dispatch) => {
      dispatch(syncTimestamps(beforeTime, state.time));
      dispatch(loadedState(state));
      dispatch(loadHistory());
    }
  });
}

export function setJWT(jwt) {
  return {
    type: SET_TOKEN,
    payload: { jwt }
  };
}

function loginStart() {
  return { type: LOGIN_START };
}

export function login({ email, password }) {
  return post('/auth/login', { email, password }, {
    onStart: loginStart,
    onComplete: res => (dispatch) => {
      Session.set(res.meta.jwt);
      dispatch(setJWT(res.meta.jwt));
      dispatch(initState());
    },
    onError: error => ({
      type: LOGIN_COMPLETE,
      error: true,
      payload: error
    })
  });
}

export function register({ email, username, password, grecaptcha }) {
  return post('/auth/register', { email, username, password, grecaptcha }, {
    onStart: () => ({ type: REGISTER_START }),
    onComplete: res => (dispatch) => {
      const user = res.data;
      debug('registered', user);
      dispatch({
        type: REGISTER_COMPLETE,
        payload: { user }
      });
      dispatch(login({ email, password }));
    },
    onError: error => ({
      type: REGISTER_COMPLETE,
      error: true,
      payload: error
    })
  });
}

function logoutStart() {
  return { type: LOGOUT_START };
}

function logoutComplete() {
  return (dispatch) => {
    dispatch({ type: LOGOUT_COMPLETE });
    dispatch(setPlaylists([]));
  };
}

export function logout() {
  return (dispatch, getState) => {
    const me = currentUserSelector(getState());
    dispatch(logoutStart());
    Session.unset();
    if (me) {
      dispatch(logoutComplete());
      dispatch(socketReconnect());
    } else {
      dispatch(logoutComplete());
    }
  };
}
