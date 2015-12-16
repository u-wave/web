import { advance } from '../actions/BoothActionCreators';
import { receive as chatReceive } from '../actions/ChatActionCreators';
import { join as userJoin, leave as userLeave } from '../actions/UserActionCreators';
import { joinedWaitlist, leftWaitlist, updatedWaitlist } from '../actions/WaitlistActionCreators';
import WebSocket from 'ReconnectingWebSocket';

const debug = require('debug')('uwave:websocket');

let socket = null;
let sentJWT = false;
let queue = [];

function send(command, data) {
  if (socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify({ command, data }));
  } else {
    queue.push({ command, data });
  }
}

function onMessage(dispatch, json) {
  const { command, data } = JSON.parse(json);
  debug(command, data);
  // convert between server & client message formats
  switch (command) {
  case 'chatMessage':
    dispatch(chatReceive({
      _id: data._id + '-' + data.timestamp,
      userID: data._id,
      text: data.message,
      timestamp: data.timestamp
    }));
    break;
  case 'advance':
    dispatch(advance(data));
    break;

  case 'waitlistJoin':
    dispatch(joinedWaitlist(data));
    break;
  case 'waitlistLeave':
    dispatch(leftWaitlist(data));
    break;
  case 'waitlistUpdate':
    dispatch(updatedWaitlist(data));
    break;

  case 'join':
    dispatch(userJoin(data));
    break;
  case 'leave':
    dispatch(userLeave(data));
    break;
  default:
    debug('!unknown socket message type');
  }
}

export function auth(jwt) {
  if (!sentJWT && socket.readyState === WebSocket.OPEN) {
    socket.send(jwt);
  }
}

export function sendMessage(chatMessage) {
  send('sendChat', chatMessage.payload.message);
}

export function connect(store, url = location.href.replace(/^http(s)?:/, 'ws$1:')) {
  socket = new WebSocket(url);
  socket.onmessage = pack => {
    onMessage(store.dispatch, pack.data);
  };
  socket.onopen = () => {
    const jwt = store.getState().auth.jwt;
    debug('open', jwt);
    if (jwt) {
      socket.send(jwt);
      sentJWT = jwt;
    } else {
      sentJWT = false;
    }
    const messages = queue;
    queue = [];
    messages.forEach(msg => send(msg.command, msg.data));
  };
}
