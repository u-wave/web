import assign from 'object-assign';
import EventEmitter from 'events';
import dispatcher from '../dispatcher';

let volume = 0;

const VolumeStore = assign(new EventEmitter, {
  getVolume() {
    return volume;
  },

  dispatchToken: dispatcher.register(payload => {
    switch (payload.action) {
    case 'setVolume':
      volume = payload.volume;
      VolumeStore.emit('change');
      break;
    default:
      // Not for us
    }
  })
});

export default VolumeStore;
