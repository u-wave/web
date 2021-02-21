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
  receive as chatReceive,
  removeMessage,
  removeMessagesByUser,
  removeAllMessages,
  muteUser as chatMute,
  unmuteUser as chatUnmute,
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

function defaultUrl() {
  const loc = window.location;
  const port = loc.port || (loc.protocol === 'https:' ? 443 : 80);
  const protocol = loc.protocol === 'https:' ? 'wss:' : 'ws:';
  return `${protocol}//${loc.hostname}:${port}`;
}

const actions = {
  chatMessage({
    id, userID, message, timestamp,
  }) {
    return chatReceive({
      _id: id,
      userID,
      text: message,
      timestamp,
    });
  },
  chatDelete() {
    return removeAllMessages();
  },
  chatDeleteByID({ _id }) {
    return removeMessage(_id);
  },
  chatDeleteByUser({ userID }) {
    return removeMessagesByUser(userID);
  },
  chatMute({ userID, expiresAt, moderatorID }) {
    return chatMute(userID, { moderatorID, expiresAt });
  },
  chatUnmute({ userID, moderatorID }) {
    return chatUnmute(userID, { moderatorID });
  },
  advance(booth) {
    return advance(booth);
  },
  skip({ userID, moderatorID, reason }) {
    return skipped({ userID, moderatorID, reason });
  },
  favorite({ userID, historyID }) {
    return favorited({ userID, historyID });
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
};

// WebSocket wrapper with reconnection and message parsing.
// This is quite ugly, based on an older version which used reconnecting-websocket
// and a bunch of separate functions nested inside the middleware.
// This should be refactored to move the message handling out of the class,
// and probably move the dispatch() calls to events using `mitt` or options.
class UwaveSocket {
  constructor({ url, dispatch, getState }) {
    this.url = url;
    this.socket = null;
    this.queue = [];
    this.sentAuthToken = false;
    this.authToken = null;
    this.opened = false;
    this.reconnectAttempts = 0;
    this.reconnectTimeout = null;
    this.dispatch = dispatch;
    this.getState = getState;
  }

  isOpen() {
    return this.socket && this.opened;
  }

  sendAuthToken(token) {
    if (this.isOpen()) {
      this.socket.send(token);
      this.sentAuthToken = true;
    } else {
      this.authToken = token;
    }
  }

  send(command, data) {
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

  onMessage = (pack) => {
    // Ignore keepalive messages.
    if (pack.data === '-') return;

    const { command, data } = JSON.parse(pack.data);

    if (command === 'authenticated') {
      this.drainQueuedMessages();
      return;
    }

    if (typeof actions[command] === 'function') {
      const action = actions[command](data);
      if (action) {
        this.dispatch(action);
      }
    }
  };

  connect() {
    return new Promise((resolve, reject) => {
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
    this.socket.removeEventListener('close', this.onClose);
    this.socket.addEventListener('close', () => {
      this.opened = false;
      this.dispatch({ type: SOCKET_DISCONNECTED });
      this.socket = null;
    });
    this.socket.close();
  }

  reconnect() {
    return this.dispatch(initState())
      .then(({ socketToken }) => (
        this.connect().then(() => {
          this.sendAuthToken(socketToken);
        })
      ))
      .then(() => {
        this.drainQueuedMessages();
      });
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

export default function middleware({ url = defaultUrl() } = {}) {
  return ({ dispatch, getState }) => {
    const socket = new UwaveSocket({
      url,
      dispatch,
      getState,
    });

    window.soc = socket; // eslint-disable-line

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
          socket.connect();
          break;
        case SEND_MESSAGE:
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
