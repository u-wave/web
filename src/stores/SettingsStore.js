import assign from 'object-assign';
import EventEmitter from 'eventemitter3';
import dispatcher from '../dispatcher';

const settings = {
  muted: false,
  videoSize: 'large',
  volume: 0
};

const SettingsStore = assign(new EventEmitter, {
  getAll() {
    return assign({}, settings);
  },
  getSetting(name) {
    return settings[name];
  },

  dispatchToken: dispatcher.register(({ type, payload }) => {
    switch (type) {
    case 'loadSettings':
    case 'setSettings':
      assign(settings, payload);
      SettingsStore.emit('change');
      break;
    default:
      // Not for us
    }
  })
});

export default SettingsStore;
