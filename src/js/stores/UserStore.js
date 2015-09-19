import assign from 'object-assign';
import EventEmitter from 'events';
import dispatcher from '../dispatcher';

function values(obj) {
  const arr = [];
  for (const i in obj) if (obj.hasOwnProperty(i)) {
    arr.push(obj[i]);
  }
  return arr;
}

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
      users[data.id] = payload.user;
      UserStore.emit('change');
      break;
    case 'leave':
      delete users[payload.userId];
      UserStore.emit('change');
      break;
    default:
      // Not for us
    }
  })
});

export default UserStore;
