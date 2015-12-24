import { expect } from 'chai';
import {
  LOGIN_COMPLETE, SET_TOKEN
} from '../src/constants/actionTypes/auth';
import auth from '../src/reducers/auth';

describe('reducers/auth', () => {
  const initialState = () => {
    const state = auth(undefined, { type: '@@redux/INIT' });
    expect(state.jwt).to.be.null;
    return state;
  };

  it('should not respond to unrelated actions', () => {
    let state = { jwt: 'abc' };
    state = auth(state, { type: 'randomOtherAction', payload: {} });
    expect(state).to.eql({ jwt: 'abc' });
  });
  it('should default to a logged-out session', () => {
    let state;
    state = auth(state, { type: '@@redux/INIT' });
    expect(state).to.eql({
      jwt: null,
      user: null,
      error: null
    });
  });

  describe('action: auth/SET_TOKEN', () => {
    it('should set the current session token', () => {
      let state = initialState();
      state = auth(state, { type: SET_TOKEN, payload: { jwt: 'test token' } });
      expect(state.jwt).to.equal('test token');
    });
  });

  describe('action: auth/LOGIN_COMPLETE', () => {
    it('should set the current user if successful', () => {
      let state = initialState();
      const userObj = { _id: Math.random() };
      state = auth(state, {
        type: LOGIN_COMPLETE,
        payload: { jwt: 'test token', user: userObj }
      });
      expect(state.jwt).to.equal('test token');
      expect(state.user).to.eql(userObj);
      expect(state.error).to.be.null;
    });

    it('should save the error if unsuccessful', () => {
      let state = initialState();
      state = auth(state, {
        type: LOGIN_COMPLETE,
        payload: new Error('failed'),
        error: true
      });
      expect(state.jwt).to.be.null;
      expect(state.user).to.be.null;
      expect(state.error).to.be.instanceOf(Error);
      expect(state.error.message).to.equal('failed');
    });
  });
});
