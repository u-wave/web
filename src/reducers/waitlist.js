const initialState = {
  waitlist: [],
  locked: false
};

export default function reduce(state = initialState, action = {}) {
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
