import {
  SOCKET_CONNECT,
  SOCKET_RECONNECT,
  REGISTER_START,
  REGISTER_COMPLETE,
  LOGIN_START,
  LOGIN_COMPLETE,
  SET_TOKEN,
  LOGOUT_START,
  LOGOUT_COMPLETE,
  RESET_PASSWORD_COMPLETE,
} from '../constants/ActionTypes';
import * as Session from '../utils/Session';
import { get, post, del } from './RequestActionCreators';
import { initState } from '../reducers/auth';

export function socketConnect() {
  return { type: SOCKET_CONNECT };
}

export function socketReconnect() {
  return { type: SOCKET_RECONNECT };
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
    onComplete: (res) => (dispatch) => {
      Session.set(res.meta.jwt);
      dispatch(setSessionToken(res.meta.jwt));
      return dispatch(initState());
    },
    onError: (error) => ({
      type: LOGIN_COMPLETE,
      error: true,
      payload: error,
    }),
  });
}

export function registerCompleteError(error) {
  return {
    type: REGISTER_COMPLETE,
    error: true,
    payload: error,
  };
}

export function register({
  email, username, password, grecaptcha,
}) {
  return post('/auth/register', {
    email, username, password, grecaptcha,
  }, {
    onStart: () => ({ type: REGISTER_START }),
    onComplete: (res) => (dispatch) => {
      const user = res.data;
      dispatch({
        type: REGISTER_COMPLETE,
        payload: { user },
      });
      return dispatch(login({ email, password }));
    },
    onError: registerCompleteError,
  });
}

function logoutStart() {
  return { type: LOGOUT_START };
}

function logoutComplete() {
  return { type: LOGOUT_COMPLETE };
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
    onError: (error) => ({
      type: RESET_PASSWORD_COMPLETE,
      error: true,
      payload: error,
    }),
  });
}

export function getSocketAuthToken() {
  return get('/auth/socket', {
    onComplete: (res) => () => ({
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
    let messageHandlerCalled = false;
    let promise;

    function onlogin() {
      // Check login state after the window closed.
      promise = dispatch(initState());
    }
    function oncreate(data) {
      promise = Promise.resolve();
      dispatch({
        type: 'auth/OPEN_LOGIN_DIALOG',
        payload: {
          show: 'social',
          service: data.type,
          id: data.id,
          suggestedName: data.suggestedName,
          avatars: data.avatars,
        },
      });
    }

    // eslint-disable-next-line compat/compat
    const apiOrigin = new URL(apiUrl, window.location.href).origin;
    const clientOrigin = window.location.origin;

    window.addEventListener('message', (event) => {
      const { data, origin } = event;
      if (apiOrigin !== origin) {
        // eslint-disable-next-line no-console
        console.warn('Incorrect origin, discarding', apiUrl, origin, data);
        return;
      }

      messageHandlerCalled = true;

      if (data.pending) {
        oncreate(data);
      } else {
        onlogin();
      }
    });

    const loginWindow = window.open(`${apiUrl}/auth/service/${service}?origin=${clientOrigin}`);
    return whenWindowClosed(loginWindow).then(() => {
      if (messageHandlerCalled) return promise;
      return onlogin();
    });
  };
}
export function loginWithGoogle() {
  return socialLogin('google');
}

export function finishSocialLogin(service, params) {
  return post(`/auth/service/${service}/finish`, params, {
    onStart: loginStart,
    onComplete: (res) => (dispatch) => {
      Session.set(res.meta.jwt);
      dispatch(setSessionToken(res.meta.jwt));
      dispatch(initState());
    },
    onError: (error) => ({
      type: LOGIN_COMPLETE,
      error: true,
      payload: error,
    }),
  });
}
