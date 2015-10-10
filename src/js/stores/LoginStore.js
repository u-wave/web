import assign from 'object-assign';
import EventEmitter from 'events';
import dispatcher from '../dispatcher';

let jwt;
let user;

const LoginStore = assign(new EventEmitter, {
  getToken() {
    return jwt;
  },
  getUser() {
    return user;
  },

  dispatchToken: dispatcher.register(payload => {
    switch (payload.action) {
    case 'setSession':
      jwt = payload.jwt;
      user = null;
      LoginStore.emit('change');
      break;
    case 'loginComplete':
      jwt = payload.jwt;
      user = payload.user;
      LoginStore.emit('change');
      break;
    default:
      // Not for us
    }
  })
});

export default LoginStore;
