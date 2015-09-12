import assign from 'object-assign';
import EventEmitter from 'events';
import dispatcher from '../dispatcher';

const clone = x => assign({}, x);

let media = {};

const CurrentMediaStore = assign(new EventEmitter, {
  getMedia() {
    return clone(media);
  },

  dispatchToken: dispatcher.register(payload => {
    switch (payload.action) {
    case 'advance':
      media = payload.video;
      CurrentMediaStore.emit('change');
      break;
    default:
      // I don't care!
    }
  })
});

export default CurrentMediaStore;
