import {
  LOAD_CONFIG_SCHEMA_START,
  LOAD_CONFIG_SCHEMA_COMPLETE,
} from '../constants/ActionTypes';

const initialState = {
  schema: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_CONFIG_SCHEMA_START:
      return state;
    case LOAD_CONFIG_SCHEMA_COMPLETE:
      return {
        ...state,
        schema: action.payload,
      };
    default:
      return state;
  }
}
