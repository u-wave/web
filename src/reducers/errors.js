export default function reduce(state = [], action = {}) {
  const { type, payload, error } = action;
  if (error) {
    // Avoid adding the same error over and over
    if (state.length === 0 || state[state.length - 1] !== payload.message) {
      return [...state, payload.message];
    }
  } else if (type === 'errors/DISMISS') {
    return state.slice(1);
  }
  return state;
}
