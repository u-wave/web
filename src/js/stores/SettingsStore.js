import assign from 'object-assign';
import EventEmitter from 'events';
import dispatcher from '../dispatcher';

const settings = {
  videoSize: 'large'
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
