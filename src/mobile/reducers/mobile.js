import {
  SET_DRAWER_OPEN,
  SET_USERS_DRAWER_OPEN,
  TOGGLE_DRAWER_OPEN,
} from '../constants/ActionTypes';

const initialState = {
  drawer: false,
  usersDrawer: false,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_DRAWER_OPEN:
      return {
        ...state,
        drawer: action.payload,
      };
    case SET_USERS_DRAWER_OPEN:
      return {
        ...state,
        usersDrawer: action.payload,
      };
    case TOGGLE_DRAWER_OPEN:
      return {
        ...state,
        drawer: !state.drawer,
      };
    default:
      return state;
  }
}
