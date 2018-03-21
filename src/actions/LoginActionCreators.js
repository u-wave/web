import createDebug from 'debug';
import {
  INIT_STATE,
  SOCKET_CONNECT,
  SOCKET_RECONNECT,

  AUTH_STRATEGIES,
  REGISTER_START,
  REGISTER_COMPLETE,
  LOGIN_START,
  LOGIN_COMPLETE,
  SET_TOKEN,
  LOGOUT_START,
  LOGOUT_COMPLETE,

  RESET_PASSWORD_COMPLETE,
} from '../constants/actionTypes/auth';
import { LOAD_ALL_PLAYLISTS_START } from '../constants/actionTypes/playlists';
import * as Session from '../utils/Session';
import { get, post, del } from './RequestActionCreators';
import { advance, loadHistory } from './BoothActionCreators';
import { receiveMotd } from './ChatActionCreators';
import { setPlaylists, selectPlaylist, activatePlaylistComplete } from './PlaylistActionCreators';
import { syncTimestamps } from './TickerActionCreators';
import { closeLoginDialog } from './DialogActionCreators';
import { setUsers } from './UserActionCreators';
import { setVoteStats } from './VoteActionCreators';
import { setWaitList } from './WaitlistActionCreators';
import { tokenSelector } from '../selectors/userSelectors';

const debug = createDebug('uwave:actions:login');

export function socketConnect() {
  return { type: SOCKET_CONNECT };
}

export function socketReconnect() {
  return { type: SOCKET_RECONNECT };
}

export function setAuthenticationStrategies(strategies) {
  return {
    type: AUTH_STRATEGIES,
    payload: { strategies },
  };
}

export function loginComplete({ token, socketToken, user }) {
  return (dispatch) => {
    dispatch({
      type: LOGIN_COMPLETE,
      payload: {
        token,
        socketToken,
        user,
      },
    });
    dispatch(closeLoginDialog());
  };
}

export function loadedState(state) {
  return (dispatch, getState) => {
    dispatch({
      type: INIT_STATE,
      payload: state,
    });
    if (state.motd) {
      dispatch(receiveMotd(state.motd));
    }
    dispatch(setAuthenticationStrategies(state.authStrategies));
    dispatch(setUsers(state.users || []));
    dispatch(setPlaylists(state.playlists || []));
    dispatch(setWaitList({
      waitlist: state.waitlist,
      locked: state.waitlistLocked,
    }));
    if (state.booth && state.booth.historyID) {
      // TODO don't set this when logging in _after_ entering the page?
      dispatch(advance(state.booth));
      dispatch(setVoteStats(state.booth.stats));
    }
    if (state.user) {
      const token = tokenSelector(getState());
      dispatch(loginComplete({
        token,
        socketToken: state.socketToken,
        user: state.user,
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
    },
  });
}

export function setSessionToken(token) {
  return {
    type: SET_TOKEN,
    payload: { token },
  };
}

function loginStart() {
  return { type: LOGIN_START };
}

export function login({ email, password }) {
  const sessionType = Session.preferredSessionType();
  return post(`/auth/login?session=${sessionType}`, { email, password }, {
    onStart: loginStart,
    onComplete: res => (dispatch) => {
      Session.set(res.meta.jwt);
      dispatch(setSessionToken(res.meta.jwt));
      dispatch(initState());
    },
    onError: error => ({
      type: LOGIN_COMPLETE,
      error: true,
      payload: error,
    }),
  });
}

export function register({
  email, username, password, grecaptcha,
}) {
  return post('/auth/register', {
    email, username, password, grecaptcha,
  }, {
    onStart: () => ({ type: REGISTER_START }),
    onComplete: res => (dispatch) => {
      const user = res.data;
      debug('registered', user);
      dispatch({
        type: REGISTER_COMPLETE,
        payload: { user },
      });
      dispatch(login({ email, password }));
    },
    onError: error => ({
      type: REGISTER_COMPLETE,
      error: true,
      payload: error,
    }),
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
  return del('/auth', {}, {
    onStart: () => (dispatch) => {
      dispatch(logoutStart());
      Session.unset();
    },
    onComplete: logoutComplete,
  });
}

export function resetPassword(email) {
  return post('/auth/password/reset', email, {
    onComplete: () => ({
      type: RESET_PASSWORD_COMPLETE,
      payload: 'Successfully sent password reset email',
    }),
    onError: error => ({
      type: RESET_PASSWORD_COMPLETE,
      error: true,
      payload: error,
    }),
  });
}

export function getSocketAuthToken() {
  return get('/auth/socket', {
    onComplete: res => () => ({
      socketToken: res.data.socketToken,
    }),
  });
}

function whenWindowClosed(window) {
  return new Promise((resolve) => {
    const i = setInterval(() => {
      if (window.closed) {
        clearInterval(i);
        resolve();
      }
    }, 50);
  });
}
function socialLogin(service) {
  return (dispatch, getState) => {
    const { apiUrl } = getState().config;
    const loginWindow = window.open(`${apiUrl}/auth/service/${service}`);
    return whenWindowClosed(loginWindow).then(() => {
      // Check login state after the window closed.
      dispatch(initState());
    });
  };
}
export function loginWithGoogle() {
  return socialLogin('google');
}
