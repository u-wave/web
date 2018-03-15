import { SELECT_PANEL } from '../constants/actionTypes/panel';

const initialState = 'chat';

export default function reduce(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case SELECT_PANEL:
      return payload.panel;
    default:
      return state;
  }
}
