import { expect } from 'chai';
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
    expect(state).to.be.an('object');
    expect(state).to.contain.all.keys([ 'jwt', 'user', 'error' ]);
    expect(state.jwt).to.be.null;
    expect(state.user).to.be.null;
    expect(state.error).to.be.null;
  });
  it('should default to a closed login modal', () => {
    let state;
    state = auth(state, { type: '@@redux/INIT' });
    expect(state.modal).to.be.an('object');
    expect(state.modal).to.contain.all.keys([ 'open', 'show' ]);
    expect(state.modal.open).to.be.false;
  });

  describe('action: setSession', () => {
    it('should set the current session token', () => {
      let state = initialState();
      state = auth(state, { type: 'setSession', payload: { jwt: 'test token' } });
      expect(state.jwt).to.equal('test token');
    });
  });

  describe('action: loginComplete', () => {
    it('should set the current user if successful', () => {
      let state = initialState();
      const userObj = { _id: Math.random() };
      state = auth(state, {
        type: 'loginComplete',
        payload: { jwt: 'test token', user: userObj }
      });
      expect(state.jwt).to.equal('test token');
      expect(state.user).to.eql(userObj);
      expect(state.error).to.be.null;
    });

    it('should save the error if unsuccessful', () => {
      let state = initialState();
      state = auth(state, {
        type: 'loginComplete',
        payload: new Error('failed'),
        error: true
      });
      expect(state.jwt).to.be.null;
      expect(state.user).to.be.null;
      expect(state.error).to.be.instanceOf(Error);
      expect(state.error.message).to.equal('failed');
    });

    it('should close the login modal if successful', () => {
      let state = initialState();
      state.modal = { ...state.modal, open: true, show: 'login' };
      state = auth(state, {
        type: 'loginComplete',
        payload: { jwt: 'test token', user: {} }
      });
      expect(state.modal).to.eql({
        open: false,
        show: 'login'
      });
    });

    it('should not close login modal if unsuccessful', () => {
      let state = initialState();
      state.modal = { ...state.modal, open: true, show: 'login' };
      state = auth(state, {
        type: 'loginComplete',
        payload: new Error,
        error: true
      });
      expect(state.modal).to.eql({
        open: true,
        show: 'login'
      });
    });
  });
});
