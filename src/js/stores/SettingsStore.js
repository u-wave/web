import assign from 'object-assign';
import EventEmitter from 'events';
import dispatcher from '../dispatcher';

const settings = {};

const SettingsStore = assign(new EventEmitter, {
  getAll() {
    return assign({}, settings);
  },
  getSetting(name) {
    return settings[name];
  },

  dispatchToken: dispatcher.register(payload => {
    switch (payload.action) {
    case 'loadSettings':
    case 'setSettings':
      assign(settings, payload.settings);
      SettingsStore.emit('change');
      break;
    default:
      // Not for us
    }
  })
});

export default SettingsStore;
