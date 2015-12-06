const initialState = {
  jwt: null,
  user: null,
  error: null,
  modal: {
    open: false,
    show: 'login'
  }
};

export default function reduce(state = initialState, action = {}) {
  const { type, payload, meta, error: isError } = action;
  switch (type) {
  case 'setSession':
    return {
      ...state,
      jwt: payload.jwt,
      user: null,
      error: null
    };
  case 'loginComplete':
    return isError ? {
      ...state,
      jwt: null,
      user: null,
      error: payload
    } : {
      ...state,
      jwt: payload.jwt,
      user: payload.user,
      error: null,
      modal: {
        ...state.modal,
        open: false
      }
    };
  case 'registerComplete':
    return {
      ...state,
      jwt: null,
      user: null,
      error: payload
    };
  case 'logoutComplete':
    return initialState;
  case 'openLoginModal':
    return {
      ...state,
      modal: {
        ...state.modal,
        open: true,
        show: meta.register ? 'register' : 'login'
      }
    };
  default:
    return state;
  }
}

export const getToken = state => state.auth.jwt;
export const getUser = state => state.auth.user;
