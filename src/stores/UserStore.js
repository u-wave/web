import values from 'object-values';
import Store from './Store';

const initialState = {};

function indexBy(prop, arr) {
  return arr.reduce((map, item) => {
    map[item[prop]] = item;
    return map;
  }, {});
}
function without(prop, obj) {
  return Object.keys(obj).reduce((newObj, key) => {
    if (key !== prop) newObj[key] = obj[key];
    return newObj;
  }, {});
}

function reduce(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
  case 'setUsers':
    return indexBy('_id', payload.users);
  case 'join':
    return {
      ...state,
      [payload.user._id]: payload.user
    };
  case 'leave':
    return without(payload.userID, state);
  default:
    return state;
  }
}

class UserStore extends Store {
  reduce(state, action) {
    return reduce(state, action);
  }

  getUser(id) {
    return this.state[id];
  }
  getUsers() {
    return values(this.state);
  }
  getOnlineUsers() {
    return values(this.state);
  }
}

export default new UserStore;
