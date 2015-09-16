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

  getTimeElapsed() {
    return Math.floor(Date.now() / 1000 - startTime);
  },

  dispatchToken: dispatcher.register(payload => {
    switch (payload.action) {
    case 'advance':
      media = payload.media;
      startTime = Math.floor(Date.now() / 1000) - (media.seek || 0);
      CurrentMediaStore.emit('change');
      break;
    default:
      // I don't care!
    }
  })
});

export default CurrentMediaStore;
