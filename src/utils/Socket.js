import { advance } from '../actions/AdvanceActionCreators';
import { receive as chatReceive } from '../actions/ChatActionCreators';
import { join as userJoin, leave as userLeave } from '../actions/UserActionCreators';
import { joinedWaitlist, leftWaitlist, updatedWaitlist } from '../actions/WaitlistActionCreators';
import WebSocket from 'ReconnectingWebSocket';

const debug = require('debug')('uwave:websocket');

let socket = null;
let queue = [];

function sendRaw(message) {
  if (socket.readyState === WebSocket.OPEN) {
    socket.send(message);
  } else {
    queue.push(message);
  }
}

function send(command, data) {
  sendRaw(JSON.stringify({ command, data }));
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
  sendRaw(jwt);
}

export function sendMessage(chatMessage) {
  send('sendChat', chatMessage.payload.message);
}

export function connect(dispatch, url = location.href.replace(/^http(s)?:/, 'ws$1:')) {
  socket = new WebSocket(url);
  socket.onmessage = pack => {
    onMessage(dispatch, pack.data);
  };
  socket.onopen = () => {
    const messages = queue;
    queue = [];
    messages.forEach(sendRaw);
  };
}
