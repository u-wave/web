import assign from 'object-assign';
import EventEmitter from 'events';
import dispatcher from '../dispatcher';

let volume = 0;
let muted = false;

const VolumeStore = assign(new EventEmitter, {
  getVolume() {
    return volume;
  },

  isMuted() {
    return muted;
  },

  dispatchToken: dispatcher.register(payload => {
    switch (payload.action) {
    case 'setVolume':
      volume = payload.volume;
      VolumeStore.emit('change');
      break;
    case 'mute':
      muted = true;
      VolumeStore.emit('change');
      break;
    case 'unmute':
      muted = false;
      VolumeStore.emit('change');
      break;
    default:
      // Not for us
    }
  })
});

export default VolumeStore;
