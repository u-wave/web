import assign from 'object-assign';
import EventEmitter from 'eventemitter3';
import dispatcher from '../dispatcher';
import UserStore from './UserStore';

let waitlist = [];
let locked = false;

const WaitlistStore = assign(new EventEmitter, {
  isLocked() {
    return locked;
  },
  getUsers() {
    return waitlist.map(UserStore.getUser, UserStore);
  },
  getSize() {
    return waitlist.length;
  },
  isInWaitlist(user) {
    return waitlist.some(id => user._id === id);
  },

  dispatchToken: dispatcher.register(({ type, payload }) => {
    switch (type) {
    case 'loadedWaitlist':
      waitlist = payload.waitlist;
      locked = payload.locked;
      WaitlistStore.emit('change');
      break;
    case 'lockWaitlist':
      locked = payload.locked;
      WaitlistStore.emit('change');
      break;
    case 'clearWaitlist':
      waitlist = [];
      WaitlistStore.emit('change');
      break;
    case 'joinedWaitlist':
    case 'leftWaitlist':
      waitlist = payload.waitlist;
      WaitlistStore.emit('change');
      break;
    case 'waitlistAdd':
    case 'waitlistMove':
    case 'waitlistRemove':
      // TODO Add chat log messages
      waitlist = payload.waitlist;
      WaitlistStore.emit('change');
      break;
    default:
      // I don't care!
    }
  })
});

export default WaitlistStore;
