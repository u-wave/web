import Store from './Store';

const initialState = 'chat';

function reduce(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
  case 'selectPanel':
    return payload.panel;
  default:
    return state;
  }
}

class SelectedPanelStore extends Store {
  reduce(state, action) {
    return reduce(state, action);
  }

  getSelectedPanel() {
    return this.state;
  }
}

export default new SelectedPanelStore;
