import Store from './Store';
import UserStore from './UserStore';

const initialState = {
  waitlist: [],
  locked: false
};

function reduce(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
  case 'loadedWaitlist':
    return {
      waitlist: payload.waitlist,
      locked: payload.locked,
      ...state
    };
  case 'lockWaitlist':
    return {
      locked: payload.locked,
      ...state
    };
  case 'clearWaitlist':
    return {
      waitlist: [],
      ...state
    };
  case 'joinedWaitlist':
  case 'leftWaitlist':
  case 'waitlistAdd':
  case 'waitlistRemove':
  case 'waitlistMove':
  case 'updatedWaitlist':
    return {
      waitlist: payload.waitlist,
      ...state
    };
  default:
    return state;
  }
}

class WaitlistStore extends Store {
  reduce(state, action) {
    return reduce(state, action);
  }

  getUsers() {
    return this.state.waitlist.map(UserStore.getUser, UserStore).filter(Boolean);
  }
  getSize() {
    return this.state.waitlist.length;
  }
  isLocked() {
    return this.state.locked;
  }
  isInWaitlist(user) {
    return user && this.state.waitlist.some(id => user._id === id);
  }
}

export default new WaitlistStore;
