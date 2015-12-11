const initialState = 0;

export default function reduce(state = initialState, action = {}) {
  return action.type === 'tick'
    ? Date.now()
    : state;
}
