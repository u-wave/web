import assign from 'object-assign';
import EventEmitter from 'events';
import dispatcher from '../dispatcher';

const clone = x => assign({}, x);

function tick(store) {
  store.emit('change');
}

let media = {};
let startTime = null;

const CurrentMediaStore = assign(new EventEmitter, {
  init() {
    setInterval(() => {
      tick(CurrentMediaStore);
    }, 1000);
  },

  getMedia() {
    return clone(media);
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
      startTime = payload.timestamp;
      CurrentMediaStore.emit('change');
      break;
    default:
      // I don't care!
    }
  })
});

export default CurrentMediaStore;
