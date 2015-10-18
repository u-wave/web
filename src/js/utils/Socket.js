import dispatcher from '../dispatcher';
import { advance } from '../actions/AdvanceActionCreators';
import { receive as chatReceive } from '../actions/ChatActionCreators';
import { join as userJoin, leave as userLeave } from '../actions/UserActionCreators';
import WebSocket from 'ReconnectingWebSocket';

const debug = require('debug')('uwave:websocket');

let dispatchToken = null;
export { dispatchToken };

let socket = null;
function send(command, data) {
  socket.send(JSON.stringify({ command, data }));
}

function onMessage(json) {
  const { command, data } = JSON.parse(json);
  debug(command, data);
  // convert between server & client message formats
  switch (command) {
  case 'chatMessage':
    chatReceive({
      _id: data._id + '-' + data.timestamp,
      userID: data._id,
      text: data.message,
      timestamp: data.timestamp
    });
    break;
  case 'advance':
    advance(data);
    break;

  case 'join':
    userJoin(data);
    break;
  case 'leave':
    userLeave(data);
    break;
  default:
    debug('!unknown socket message type');
  }
}

export function connect(url = location.href.replace(/^http(s)?:/, 'ws$1:')) {
  socket = new WebSocket(url);
  socket.onmessage = pack => {
    onMessage(pack.data);
  };

  dispatchToken = dispatcher.register(({ type, payload }) => {
    switch (type) {
    case 'loginComplete':
      socket.send(payload.jwt);
      break;
    case 'chatSend':
      send('sendChat', payload.message);
      break;
    default:
      // Not for us
    }
  });
}
