const initialState = 'chat';

export default function reduce(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
  case 'selectPanel':
    return payload.panel;
  default:
    return state;
  }
}
