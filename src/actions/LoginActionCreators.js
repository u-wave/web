import {
  SOCKET_CONNECT,
  SOCKET_RECONNECT,
  SET_TOKEN,
} from '../constants/ActionTypes';
import { initState } from '../reducers/auth';
import { openLoginDialog } from '../reducers/dialogs';

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
      dispatch(openLoginDialog({
        show: 'social',
        service: data.type,
        id: data.id,
        suggestedName: data.suggestedName,
        avatars: data.avatars,
      }));
    }

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
