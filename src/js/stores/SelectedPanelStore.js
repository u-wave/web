import assign from 'object-assign';
import EventEmitter from 'events';
import dispatcher from '../dispatcher';

let selected = 0;
const defaultPanel = 'chat';

const SelectedPanelStore = assign(new EventEmitter, {
  getSelectedPanel() {
    return selected || defaultPanel;
  },

  dispatchToken: dispatcher.register(payload => {
    switch (payload.action) {
    case 'selectPanel':
      selected = payload.panel;
      SelectedPanelStore.emit('change');
      break;
    default:
      // Not for us
    }
  })
});

export default SelectedPanelStore;
