const initialState = require('../../lib/emoji.json');

export default function reduce(state = initialState, action = {}) {
  const { type } = action;
  switch (type) {
  default:
    return state;
  }
}
