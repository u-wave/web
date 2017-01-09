import {
  LOAD_USERS_START,
  LOAD_USERS_COMPLETE
} from '../constants/ActionTypes';

const initialState = {
  currentPage: 0,
  users: []
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
  case LOAD_USERS_START:
    return state;
  case LOAD_USERS_COMPLETE:
    return state;
  default:
    return state;
  }
}
