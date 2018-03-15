import {
  LOAD_BANS_START,
  LOAD_BANS_COMPLETE,
} from '../constants/ActionTypes';

const initialState = {
  currentPage: {
    offset: 0,
    limit: 50,
  },
  bans: [],
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_BANS_START:
      return state;
    case LOAD_BANS_COMPLETE:
      return {
        ...state,
        bans: action.payload.bans,
      };
    default:
      return state;
  }
}
