const initialState = null;

export default function reduce(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
  case 'openOverlay':
    return payload.overlay;
  case 'toggleOverlay':
    return state === payload.overlay ? null : payload.overlay;
  case 'closeOverlay':
    return null;
  default:
    return state;
  }
}
