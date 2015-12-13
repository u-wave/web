const initialState = {
  open: false,
  position: { x: 0, y: 0 },
  media: []
};

export default function reduce(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
  case 'openAddToPlaylistMenu':
    return {
      ...state,
      ...payload,
      open: true
    };
  case 'closeAddToPlaylistMenu':
    return {
      ...state,
      media: [],
      open: false
    };
  default:
    return state;
  }
}
