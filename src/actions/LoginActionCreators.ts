import { SOCKET_CONNECT, SOCKET_RECONNECT } from '../constants/ActionTypes';
import { initState } from '../reducers/auth';
import { openLoginDialog } from '../reducers/dialogs';
import type { Thunk } from '../redux/api';

export function socketConnect() {
  return { type: SOCKET_CONNECT };
}

export function socketReconnect() {
  return { type: SOCKET_RECONNECT };
}

type CreateCallbackData = {
  type: string,
  id: string,
  suggestedName: string,
  avatars: string[],
};
function whenWindowClosed(window: Window) {
  return new Promise<void>((resolve) => {
    const i = setInterval(() => {
      if (window.closed) {
        clearInterval(i);
        resolve();
      }
    }, 50);
  });
}
function socialLogin(service: string): Thunk<Promise<void>> {
  return async (dispatch, getState) => {
    const { apiUrl } = getState().config;
    let messageHandlerCalled = false;
    let promise: Promise<void> | undefined;

    function onlogin() {
      // Check login state after the window closed.
      promise = dispatch(initState()).then(() => {});
    }
    function oncreate(data: CreateCallbackData) {
      promise = Promise.resolve();
      dispatch(openLoginDialog({
        show: 'social',
        service: data.type,
        id: data.id,
        suggestedName: data.suggestedName,
        avatars: data.avatars,
      }));
    }

    const apiOrigin = new URL(apiUrl!, window.location.href).origin;
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
    if (loginWindow == null) {
      throw new Error('Could not open OAuth window');
    }

    await whenWindowClosed(loginWindow);
    if (messageHandlerCalled) {
      await promise;
    } else {
      onlogin();
    }
  };
}
export function loginWithGoogle() {
  return socialLogin('google');
}
