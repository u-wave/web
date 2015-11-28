import Store from './Store';

const SETTINGS_KEY = 'uwaveSettings';

const initialState = {
  muted: false,
  videoSize: 'large',
  volume: 0
};

function reduce(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
  case 'loadSettings':
  case 'setSettings':
    return { ...state, ...payload };
  default:
    return state;
  }
}

class SettingsStore extends Store {
  constructor() {
    super();
    this.on('change', ::this.save);
    this.load();
  }

  reduce(state, action) {
    return reduce(state, action);
  }

  getAll() {
    return this.state;
  }
  getSetting(name) {
    return this.state[name];
  }

  // localStorage settings persistence. try-catches are to deal with cookie
  // blocking.
  load() {
    try {
      this.state = this.reduce(this.state, {
        type: 'loadSettings',
        payload: JSON.parse(localStorage.getItem(SETTINGS_KEY))
      });
    } catch (e) {
      // Ok!
    }
  }

  save() {
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(this.state));
    } catch (e) {
      // Ok!
    }
  }
}

export default new SettingsStore;
