import { advance } from '../actions/BoothActionCreators';
import {
  receive as chatReceive,
  removeMessage, removeMessagesByUser, removeAllMessages,
  muteUser as chatMute, unmuteUser as chatUnmute
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
  joinedWaitlist, leftWaitlist,
  updatedWaitlist, movedInWaitlist,
  setLocked as setWaitlistLocked
} from '../actions/WaitlistActionCreators';
import { favorited, receiveVote } from '../actions/VoteActionCreators';

const debug = require('debug')('uwave:websocket');

let socket = null;
let sentJWT = false;
let queue = [];

function maybeAuthenticateOnConnect(state) {
  const jwt = state.auth.jwt;
  debug('open', jwt);
  if (jwt) {
    socket.send(jwt);
    sentJWT = jwt;
  } else {
    sentJWT = false;
  }
}

function send(command, data) {
  if (socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify({ command, data }));
  } else {
    queue.push({ command, data });
  }
}

function drainQueuedMessages() {
  const messages = queue;
  queue = [];
  messages.forEach(msg => send(msg.command, msg.data));
}

const actions = {
  chatMessage({ _id, message, timestamp }) {
    return chatReceive({
      _id: `${_id}-${timestamp}`,
      userID: _id,
      text: message,
      timestamp
    });
  },
  chatDelete() {
    return removeAllMessages();
  },
  chatDeleteByID({ chatID }) {
    return removeMessage(chatID);
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

function onMessage(dispatch, json) {
  const { command, data } = JSON.parse(json);
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

export function auth(jwt) {
  if (!sentJWT && socket.readyState === WebSocket.OPEN) {
    socket.send(jwt);
  }
}

export function sendMessage(chatMessage) {
  send('sendChat', chatMessage.payload.message);
}

export function sendVote(vote) {
  send('vote', vote);
}

function defaultUrl() {
  const port = location.port || (location.protocol === 'https:' ? 443 : 80);
  const protocol = location.protocol === 'https:' ? 'wss:' : 'ws:';
  return `${protocol}//${location.hostname}:${port}`;
}

export function reconnect() {
  if (socket) {
    socket.refresh();
  }
}

export function connect(store, url = defaultUrl()) {
  const WebSocket = require('ReconnectingWebSocket');
  socket = new WebSocket(url);
  socket.onmessage = pack => {
    onMessage(store.dispatch, pack.data);
  };
  socket.onopen = () => {
    maybeAuthenticateOnConnect(store.getState());
    drainQueuedMessages();
  };
}
