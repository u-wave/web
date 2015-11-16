import assign from 'object-assign';
import EventEmitter from 'eventemitter3';
import dispatcher from '../dispatcher';

const SETTINGS_KEY = 'uwaveSettings';

const settings = {
  muted: false,
  videoSize: 'large',
  volume: 0
};

// cookie blocking safe localStorage settings persistence
function load() {
  try {
    assign(settings, JSON.parse(localStorage.getItem(SETTINGS_KEY)));
  } catch (e) {
    // Ok!
  }
}
function save() {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (e) {
    // Ok!
  }
}

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

SettingsStore.on('change', save);
load();

export default SettingsStore;
