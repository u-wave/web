import type { AnyAction, Middleware } from 'redux';
import type { AppDispatch, StoreState } from './configureStore';
import {
  LOGIN_COMPLETE,
  LOGOUT_START,
  SOCKET_CONNECT,
  SOCKET_RECONNECT,
  SOCKET_DISCONNECTED,
  SOCKET_CONNECTED,
  SEND_MESSAGE,
} from '../constants/ActionTypes';
import { initState } from '../actions/LoginActionCreators';
import {
  advance,
  skipped,
} from '../actions/BoothActionCreators';
import {
  sendMessage,
  deleteMessageByID,
  deleteMessagesByUser,
  deleteAllMessages,
  muteUser,
  unmuteUser,
} from '../reducers/chat';
import {
  receive as receiveMessage,
  loadEmotes,
} from '../actions/ChatActionCreators';
import { cyclePlaylist } from '../actions/PlaylistActionCreators';
import {
  join as userJoin,
  leave as userLeave,
  changeUsername,
  addUserRoles,
  removeUserRoles,
  receiveGuestCount,
} from '../actions/UserActionCreators';
import {
  clearWaitlist,
  joinedWaitlist,
  leftWaitlist,
  updatedWaitlist,
  movedInWaitlist,
  setLocked as setWaitlistLocked,
} from '../actions/WaitlistActionCreators';
import { favorited, receiveVote } from '../actions/VoteActionCreators';
import { currentTimeSelector } from '../selectors/timeSelectors';
import { ThunkAction } from 'redux-thunk';

function defaultUrl() {
  const loc = window.location;
  const port = loc.port ?? (loc.protocol === 'https:' ? 443 : 80);
  const protocol = loc.protocol === 'https:' ? 'wss:' : 'ws:';
  return `${protocol}//${loc.hostname}:${port}/api/socket`;
}

type SocketMessages = {
  join: object,
  leave: string,
  guests: number,

  advance: {
    historyID: string,
    userID: string,
    itemID: string,
    media: {
      artist: string,
      title: string,
      start: number,
      end: number,
      media: {
        sourceType: string,
        sourceID: string,
        artist: string,
        title: string,
        sourceData: object,
      },
    },
    playedAt: number,
  } | null,
  skip: {
    userID: string,
    moderatorID: string,
    reason: string,
  },

  chatMessage: {
    id: string,
    userID: string,
    message: string,
    timestamp: number,
  },
  chatDelete: {
    moderatorID: string,
  },
  chatDeleteByID: {
    moderatorID: string,
    _id: string,
  },
  chatDeleteByUser: {
    moderatorID: string,
    userID: string,
  },
  chatMute: {
    userID: string,
    moderatorID: string,
    expiresAt: number,
  },
  chatUnmute: {
    userID: string,
    moderatorID: string,
  },
  vote: {
    _id: string,
    value: -1 | 1,
  },
  favorite: {
    userID: string,
  },
  playlistCycle: {
    playlistID: string,
  },
  waitlistUpdate: string[],
  waitlistJoin: {
    userID: string,
    waitlist: string[],
  },
  waitlistLeave: {
    userID: string,
    waitlist: string[],
  },
  waitlistAdd: {
    userID: string,
    waitlist: string[],
  },
  waitlistMove: {
    userID: string,
    moderatorID: string,
    position: number,
    waitlist: string[],
  },
  waitlistRemove: {
    userID: string,
    waitlist: string[],
  },
  waitlistClear: {
    moderatorID: string,
  },
  waitlistLock: {
    moderatorID: string,
    locked: boolean,
  },

  nameChange: {
    userID: string,
    username: string,
  },
  'acl:allow': {
    userID: string,
    roles: string[],
  },
  'acl:disallow': {
    userID: string,
    roles: string[],
  },

  reloadEmotes: void,
}

const actions: {
  [K in keyof SocketMessages]: (data: SocketMessages[K]) =>
    (AnyAction | ThunkAction<unknown, StoreState, never, AnyAction>)
} = {
  chatMessage({
    id, userID, message, timestamp,
  }) {
    return receiveMessage({
      _id: id,
      userID,
      text: message,
      timestamp,
    });
  },
  chatDelete() {
    return deleteAllMessages();
  },
  chatDeleteByID({ _id }) {
    return deleteMessageByID({ _id });
  },
  chatDeleteByUser({ userID }) {
    return deleteMessagesByUser({ userID });
  },
  chatMute({ userID, expiresAt, moderatorID }) {
    return (dispatch, getState) => {
      const currentTime = currentTimeSelector(getState());
      const expireIn = expiresAt - currentTime;
      const expirationTimer = expireIn > 0
        ? setTimeout(() => dispatch(unmuteUser({ userID })), expireIn)
        : null;
      muteUser({
        userID,
        moderatorID,
        expiresAt,
        expirationTimer,
      });
    };
  },
  chatUnmute({ userID, moderatorID }) {
    return unmuteUser({ userID, moderatorID });
  },
  advance(booth) {
    return advance(booth);
  },
  skip({ userID, moderatorID, reason }) {
    return skipped({ userID, moderatorID, reason });
  },
  favorite({ userID }) {
    return favorited({ userID });
  },
  vote({ _id, value }) {
    return receiveVote({ userID: _id, vote: value });
  },
  waitlistJoin({ userID, waitlist }) {
    return joinedWaitlist({ userID, waitlist });
  },
  waitlistLeave({ userID, waitlist }) {
    return leftWaitlist({ userID, waitlist });
  },
  waitlistUpdate(waitlist) {
    return updatedWaitlist(waitlist);
  },
  waitlistLock({ locked }) {
    return setWaitlistLocked(locked);
  },
  waitlistMove({
    userID, moderatorID, position, waitlist,
  }) {
    return movedInWaitlist({
      userID, moderatorID, position, waitlist,
    });
  },
  // TODO Treat moderator force-add and force-remove differently from voluntary
  // joins and leaves.
  waitlistAdd({ userID, waitlist }) {
    return joinedWaitlist({ userID, waitlist });
  },
  waitlistRemove({ userID, waitlist }) {
    return leftWaitlist({ userID, waitlist });
  },
  waitlistClear() {
    return clearWaitlist();
  },
  playlistCycle({ playlistID }) {
    return cyclePlaylist(playlistID);
  },
  join(user) {
    return userJoin(user);
  },
  leave(userID) {
    return userLeave(userID);
  },
  nameChange({ userID, username }) {
    return changeUsername(userID, username);
  },
  guests: receiveGuestCount,
  'acl:allow': ({ userID, roles }) => addUserRoles(userID, roles),
  'acl:disallow': ({ userID, roles }) => removeUserRoles(userID, roles),
  reloadEmotes: loadEmotes,
};

// WebSocket wrapper with reconnection and message parsing.
// This is quite ugly, based on an older version which used reconnecting-websocket
// and a bunch of separate functions nested inside the middleware.
// This should be refactored to move the message handling out of the class,
// and probably move the dispatch() calls to events using `mitt` or options.
class UwaveSocket {
  socket: WebSocket | null = null;

  queue: { command: string, data: object | null }[] = [];

  sentAuthToken = false;

  authToken: string | null = null;

  opened = false;

  reconnectAttempts = 0;

  reconnectTimeout: ReturnType<typeof setTimeout> | null = null;

  url: string;

  dispatch: AppDispatch;

  constructor({ url, dispatch }: {
    url: string,
    dispatch: AppDispatch,
  }) {
    this.url = url;
    this.dispatch = dispatch;
  }

  isOpen(): this is { socket: WebSocket } {
    return this.socket != null && this.opened;
  }

  sendAuthToken(token: string) {
    if (this.isOpen()) {
      this.socket.send(token);
      this.sentAuthToken = true;
    } else {
      this.authToken = token;
    }
  }

  send(command: string, data: object | null) {
    if (this.isOpen()) {
      this.socket.send(JSON.stringify({ command, data }));
    } else {
      this.queue.push({ command, data });
    }
  }

  drainQueuedMessages() {
    const messages = this.queue;
    this.queue = [];
    messages.forEach((msg) => {
      this.send(msg.command, msg.data);
    });
  }

  onOpen = () => {
    this.opened = true;
    if (!this.isOpen()) {
      return; // Just to help typescript
    }

    if (this.authToken) {
      this.socket.send(this.authToken);
      this.authToken = null;
      this.sentAuthToken = true;
    }
    this.dispatch({ type: SOCKET_CONNECTED });
  };

  onClose = () => {
    if (this.reconnectAttempts === 0) {
      this.opened = false;
      this.dispatch({ type: SOCKET_DISCONNECTED });
      this.attemptReconnect();
    }
  };

  onMessage = (pack: MessageEvent) => {
    // Ignore keepalive messages.
    if (pack.data === '-') return;

    const { command, data } = JSON.parse(pack.data);
    if (typeof command !== 'string') {
      return;
    }

    if (command === 'authenticated') {
      this.drainQueuedMessages();
      return;
    }

    if (command in actions && typeof actions[command as keyof SocketMessages] === 'function') {
      const handler = actions[command as keyof SocketMessages] as (_data: unknown) => unknown;
      const action = handler(data);
      if (action) {
        this.dispatch(action as AnyAction);
      }
    }
  };

  connect() {
    return new Promise<void>((resolve, reject) => {
      this.socket = new WebSocket(this.url);
      this.socket.addEventListener('message', this.onMessage);
      this.socket.addEventListener('open', () => {
        this.onOpen();
        resolve();
      });
      this.socket.addEventListener('close', this.onClose);
      this.socket.addEventListener('error', reject);
    });
  }

  disconnect() {
    if (!this.isOpen()) {
      return;
    }

    this.socket.removeEventListener('close', this.onClose);
    this.socket.addEventListener('close', () => {
      this.opened = false;
      this.dispatch({ type: SOCKET_DISCONNECTED });
      this.socket = null;
    });
    this.socket.close();
  }

  async reconnect() {
    // @ts-expect-error TS2339: hard to type correctly at the moment
    const { socketToken } = await this.dispatch(initState());
    await this.connect();
    this.sendAuthToken(socketToken);
    this.drainQueuedMessages();
  }

  attemptReconnect = () => {
    this.reconnectAttempts += 1;
    this.reconnect().then(() => {
      this.reconnectAttempts = 0;
    }, () => {
      this.reconnectTimeout = setTimeout(
        this.attemptReconnect,
        Math.min(1000 * this.reconnectAttempts, 10000),
      );
    });
  };
}

export default function middleware({ url = defaultUrl() } = {}):
    Middleware<void, unknown, AppDispatch> {
  return ({ dispatch }) => {
    const socket = new UwaveSocket({
      url,
      dispatch,
    });

    return (next) => (action) => {
      const { type, payload, error } = action;

      if (error) {
        next(action);
        return;
      }

      switch (type) {
        case SOCKET_RECONNECT:
          socket.disconnect();
          socket.attemptReconnect();
          break;
        case SOCKET_CONNECT:
          socket.connect().catch(() => {
            // Start attempting reconnects
            socket.attemptReconnect();
          });
          break;
        case sendMessage.type:
          socket.send('sendChat', payload.message);
          break;
        case LOGIN_COMPLETE:
          if (!socket.sentAuthToken) {
            socket.sendAuthToken(payload.socketToken);
          }
          break;
        case LOGOUT_START:
          socket.sentAuthToken = false;
          socket.send('logout', null);
          break;
        default:
          break;
      }
      next(action);
    };
  };
}
