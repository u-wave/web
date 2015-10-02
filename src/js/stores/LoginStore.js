import assign from 'object-assign';
import EventEmitter from 'events';
import dispatcher from '../dispatcher';

let jwt;

const LoginStore = assign(new EventEmitter, {
  getToken() {
    return jwt;
  },

  dispatchToken: dispatcher.register(payload => {
    switch (payload.action) {
    case 'loginComplete':
      jwt = payload.jwt;
      LoginStore.emit('change');
      break;
    default:
      // Not for us
    }
  })
});

export default LoginStore;
