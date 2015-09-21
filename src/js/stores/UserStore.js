import assign from 'object-assign';
import EventEmitter from 'events';
import values from 'object-values';
import dispatcher from '../dispatcher';

const users = {
  1425: {
    id: 1425,
    username: 'Hank',
    avatar: 'https://sigil.cupcake.io/Hank',
    role: 4
  },
  2107: {
    id: 2107,
    username: 'Joanna',
    avatar: 'https://sigil.cupcake.io/Joanna',
    role: 4
  },
  3461: {
    id: 3461,
    username: 'Tom',
    avatar: 'https://sigil.cupcake.io/Tom',
    role: 3
  },
  6543: {
    id: 6543,
    username: 'Kris',
    avatar: 'https://sigil.cupcake.io/Kris',
    role: 1
  },
  6544: {
    id: 6544,
    username: 'Kim',
    avatar: 'https://sigil.cupcake.io/Kim',
    role: 1
  }
};

const UserStore = assign(new EventEmitter, {
  getCurrentUser() {
    return UserStore.getUser(2107);
  },
  getUser(id) {
    return users[id];
  },
  getUsers() {
    return values(users);
  },
  getOnlineUsers() {
    return values(users);
  },

  dispatchToken: dispatcher.register(payload => {
    switch (payload.action) {
    case 'join':
      users[payload.user.id] = payload.user;
      UserStore.emit('change');
      break;
    case 'leave':
      delete users[payload.userID];
      UserStore.emit('change');
      break;
    default:
      // Not for us
    }
  })
});

export default UserStore;
