import createDebug from 'debug';
import WebSocket from 'reconnecting-websocket';
import {
  LOGIN_COMPLETE,
  LOGOUT_START,
  SOCKET_CONNECT,
  SOCKET_RECONNECT,
  SOCKET_DISCONNECTED,
  SOCKET_CONNECTED,
  SEND_MESSAGE,
  DO_UPVOTE,
  DO_DOWNVOTE,
} from '../constants/ActionTypes';
import { getSocketAuthToken } from '../actions/LoginActionCreators';
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

const debug = createDebug('uwave:websocket');

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

export default function middleware({ url = defaultUrl() } = {}) {
  return ({ dispatch, getState }) => {
    let socket;
    let queue = [];
    let sentAuthToken = false;
    let opened = false;

    function isOpen() {
      return socket && opened;
    }

    function sendAuthToken(tokne) {
      socket.send(tokne);
      sentAuthToken = true;
    }

    function maybeAuthenticateOnConnect(state) {
      const { user } = state.auth;
      if (!user) return;
      debug('open', user.id);

      dispatch(getSocketAuthToken()).then(({ socketToken }) => {
        if (socketToken) {
          sendAuthToken(socketToken);
        } else {
          sentAuthToken = false;
        }
      });
    }

    function send(command, data) {
      if (isOpen()) {
        socket.send(JSON.stringify({ command, data }));
      } else {
        queue.push({ command, data });
      }
    }

    function drainQueuedMessages() {
      const messages = queue;
      queue = [];
      messages.forEach((msg) => {
        send(msg.command, msg.data);
      });
    }

    function onOpen() {
      opened = true;
      dispatch({ type: SOCKET_CONNECTED });
      maybeAuthenticateOnConnect(getState());
    }

    function onClose() {
      opened = false;
      dispatch({ type: SOCKET_DISCONNECTED });
    }

    function onMessage(pack) {
      // Ignore keepalive messages.
      if (pack.data === '-') return;

      const { command, data } = JSON.parse(pack.data);
      debug(command, data);

      if (command === 'authenticated') {
        drainQueuedMessages();
        return;
      }

      if (typeof actions[command] === 'function') {
        const action = actions[command](data);
        if (action) {
          dispatch(action);
          return;
        }
      }
      debug('!unknown socket message type');
    }

    return next => (action) => {
      const { type, payload, error } = action;

      if (error) {
        next(action);
        return;
      }

      switch (type) {
        case SOCKET_RECONNECT:
          if (socket) {
            socket.close(undefined, undefined, { keepClosed: true });
          }
        // fall through
        case SOCKET_CONNECT:
          socket = new WebSocket(url);
          socket.addEventListener('message', onMessage);
          socket.addEventListener('open', onOpen);
          socket.addEventListener('close', onClose);
          socket.addEventListener('connecting', onClose);
          break;
        case SEND_MESSAGE:
          send('sendChat', payload.message);
          break;
        case DO_UPVOTE:
          send('vote', 1);
          break;
        case DO_DOWNVOTE:
          send('vote', -1);
          break;
        case LOGIN_COMPLETE:
          if (!sentAuthToken && isOpen()) {
            sendAuthToken(payload.socketToken);
          }
          break;
        case LOGOUT_START:
          sentAuthToken = false;
          send('logout', null);
          break;
        default:
          break;
      }
      next(action);
    };
  };
}
