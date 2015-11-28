import Store from './Store';

const initialState = {
  jwt: null,
  user: null,
  error: null
};

function reduce(state = initialState, action = {}) {
  const { type, payload, error: isError } = action;
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
      error: null
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
  default:
    return state;
  }
}

class LoginStore extends Store {
  reduce(state, action) {
    return reduce(state, action);
  }

  getToken() {
    return this.state.jwt;
  }
  getUser() {
    return this.state.user;
  }
  getError() {
    return this.state.error;
  }
}

export default new LoginStore;
