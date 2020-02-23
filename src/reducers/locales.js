import {
  CHANGE_LANGUAGE,
  LOAD_LANGUAGE_START,
  LOAD_LANGUAGE_COMPLETE,
} from '../constants/ActionTypes';
import en from '../../locale/en.yaml';

const initialState = {
  current: 'en',
  loading: [],
  loaded: { en },
};

export default function reduce(state = initialState, action) {
  switch (action.type) {
    case LOAD_LANGUAGE_START:
      return {
        ...state,
        loading: [...state.loading, action.payload],
      };
    case LOAD_LANGUAGE_COMPLETE: {
      const { language } = action.meta;
      return {
        ...state,
        loading: state.loading.filter((l) => l !== language),
        loaded: {
          ...state.loaded,
          [language]: action.payload,
        },
      };
    }
    case CHANGE_LANGUAGE:
      return { ...state, current: action.payload };
    default:
      return state;
  }
}
