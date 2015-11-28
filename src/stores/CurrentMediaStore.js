import Store from './Store';
import UserStore from './UserStore';

const initialState = {
  historyID: null,
  media: null,
  dj: null,
  startTime: null
};

function reduce(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
  case 'advance':
    return {
      historyID: payload.historyID,
      media: payload.media,
      dj: UserStore.getUser(payload.userID),
      startTime: payload.timestamp
    };
  default:
    return state;
  }
}

class CurrentMediaStore extends Store {
  constructor() {
    super();
    setInterval(() => this.tick(), 1000);
  }

  reduce(state, action) {
    return reduce(state, action);
  }

  getHistoryID() {
    return this.state.historyID;
  }
  getMedia() {
    return this.state.media || null;
  }
  getDJ() {
    return this.state.dj;
  }
  getStartTime() {
    return this.state.startTime;
  }
  getTimeElapsed() {
    return Math.floor((Date.now() - this.state.startTime) / 1000);
  }

  tick() {
    this.emit('change');
  }
}

export default new CurrentMediaStore;
