import assign from 'object-assign';
import EventEmitter from 'events';
import dispatcher from '../dispatcher';

let sourceType = 'youtube';

const SearchStore = assign(new EventEmitter, {
  getSourceType() {
    return sourceType;
  },

  dispatchToken: dispatcher.register(payload => {
    switch (payload.action) {
    case 'setSearchSource':
      sourceType = payload.source;
      SearchStore.emit('change');
      break;
    default:
      // Not for us
    }
  })
});

export default SearchStore;
