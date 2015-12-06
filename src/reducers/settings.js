const initialState = {
  muted: false,
  videoSize: 'large',
  volume: 0
};

export default function reduce(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
  case 'loadSettings':
  case 'setSettings':
    return { ...state, ...payload };
  default:
    return state;
  }
}
