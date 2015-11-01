import assign from 'object-assign';
import EventEmitter from 'eventemitter3';
import dispatcher from '../dispatcher';
import UserStore from './UserStore';

const clone = x => assign({}, x);

function tick(store) {
  store.emit('change');
}

let media = null;
let dj = null;
let startTime = null;

const CurrentMediaStore = assign(new EventEmitter, {
  init() {
    setInterval(() => {
      tick(CurrentMediaStore);
    }, 1000);
  },

  getMedia() {
    return media ? clone(media) : null;
  },

  getDJ() {
    return UserStore.getUser(dj);
  },

  getStartTime() {
    return startTime;
  },

  getTimeElapsed() {
    return Math.floor((Date.now() - startTime) / 1000);
  },

  dispatchToken: dispatcher.register(({ type, payload }) => {
    switch (type) {
    case 'advance':
      media = payload.media;
      dj = payload.userID;
      startTime = payload.timestamp;
      CurrentMediaStore.emit('change');
      break;
    default:
      // I don't care!
    }
  })
});

export default CurrentMediaStore;
