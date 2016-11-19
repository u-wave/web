import WebSocket from '../utils/ReconnectingWebSocket';

import {
  LOGIN_COMPLETE,
  SOCKET_CONNECT,
  SOCKET_RECONNECT
} from '../constants/actionTypes/auth';
import {
  SEND_MESSAGE
} from '../constants/actionTypes/chat';
import {
  DO_UPVOTE,
  DO_DOWNVOTE
} from '../constants/actionTypes/votes';

import { advance } from '../actions/BoothActionCreators';
import {
  receive as chatReceive,
  removeMessage,
  removeMessagesByUser,
  removeAllMessages,
  muteUser as chatMute,
  unmuteUser as chatUnmute
} from '../actions/ChatActionCreators';
import { cyclePlaylist } from '../actions/PlaylistActionCreators';
import {
  join as userJoin,
  leave as userLeave,
  changeUsername,
  changeUserRole,
  receiveGuestCount
} from '../actions/UserActionCreators';
import {
  clearWaitlist,
  joinedWaitlist,
  leftWaitlist,
  updatedWaitlist,
  movedInWaitlist,
  setLocked as setWaitlistLocked
} from '../actions/WaitlistActionCreators';
import { favorited, receiveVote } from '../actions/VoteActionCreators';

const debug = require('debug')('uwave:websocket');

function defaultUrl() {
  const port = location.port || (location.protocol === 'https:' ? 443 : 80);
  const protocol = location.protocol === 'https:' ? 'wss:' : 'ws:';
  return `${protocol}//${location.hostname}:${port}`;
}

const actions = {
  chatMessage({ id, userID, message, timestamp }) {
    return chatReceive({
      _id: id,
      userID,
      text: message,
      timestamp
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
  waitlistMove({ userID, moderatorID, position, waitlist }) {
    return movedInWaitlist({ userID, moderatorID, position, waitlist });
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
  roleChange({ userID, role }) {
    return changeUserRole(userID, role);
  },
  guests: receiveGuestCount
};

export default function middleware({ url = defaultUrl() } = {}) {
  return ({ dispatch, getState }) => {
    let socket;
    let queue = [];
    let sentJWT = false;

    function isOpen() {
      return socket && socket.readyState === WebSocket.OPEN;
    }

    function sendJWT(jwt) {
      socket.send(jwt);
      sentJWT = true;
    }

    function maybeAuthenticateOnConnect(state) {
      const jwt = state.auth.jwt;
      debug('open', jwt);
      if (jwt) {
        sendJWT(jwt);
      } else {
        sentJWT = false;
      }
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
      maybeAuthenticateOnConnect(getState());
      drainQueuedMessages();
    }

    function onMessage(pack) {
      const { command, data } = JSON.parse(pack.data);
      debug(command, data);
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
      const { type, payload } = action;
      switch (type) {
      case SOCKET_RECONNECT:
        if (socket) {
          socket.refresh();
          break;
        }
        // fall through
      case SOCKET_CONNECT:
        socket = new WebSocket(url);
        socket.onmessage = onMessage;
        socket.onopen = onOpen;
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
        if (!sentJWT && isOpen()) {
          sendJWT(payload.jwt);
        }
        break;
      default:
        break;
      }
      next(action);
    };
  };
}
