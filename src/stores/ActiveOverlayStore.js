import Store from './Store';

const initialState = null;

function reduce(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
  case 'openOverlay':
    return payload.overlay;
  case 'toggleOverlay':
    return state === payload.overlay ? null : payload.overlay;
  case 'closeOverlay':
    return null;
  default:
    return state;
  }
}

class ActiveOverlayStore extends Store {
  reduce(state, action) {
    return reduce(state, action);
  }

  getActive() {
    return this.state;
  }
}

export default new ActiveOverlayStore;
