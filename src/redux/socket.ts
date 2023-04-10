import type { AnyAction, Middleware } from 'redux';
import { createAction } from '@reduxjs/toolkit';
import type { AppDispatch } from './configureStore';
import {
  LOGOUT_START,
  SOCKET_CONNECT,
  SOCKET_RECONNECT,
  SOCKET_DISCONNECTED,
  SOCKET_CONNECTED,
} from '../constants/ActionTypes';
import { sendMessage } from '../reducers/chat';
import { initState, login } from '../reducers/auth';

function defaultUrl() {
  const loc = window.location;
  const port = loc.port ?? (loc.protocol === 'https:' ? 443 : 80);
  const protocol = loc.protocol === 'https:' ? 'wss:' : 'ws:';
  return `${protocol}//${loc.hostname}:${port}/api/socket`;
}

export type SocketMessageParams = {
  join: {
    _id: string,
    username: string,
    slug: string,
    roles: string[],
    avatar: string,
    createdAt: string,
    updatedAt: string,
    lastSeenAt: string,
  },
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

export type SocketMessage = {
  [K in keyof SocketMessageParams]: {
    command: K,
    data: SocketMessageParams[K],
  };
}[keyof SocketMessageParams];

export const socketMessage = createAction('websocket/receive', (payload: SocketMessage) => ({ payload }));

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

    this.dispatch(socketMessage({
      command,
      data,
    } as SocketMessage));
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
    const { payload } = await this.dispatch(initState());
    await this.connect();
    if (payload.socketToken) {
      this.sendAuthToken(payload.socketToken);
    }
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
        case login.fulfilled.type:
        case initState.fulfilled.type:
          if (!socket.sentAuthToken && payload.socketToken) {
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
