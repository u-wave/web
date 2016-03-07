import { expect } from 'chai';
import proxyquire from 'proxyquire';

import { LOGIN_COMPLETE } from '../../src/constants/actionTypes/auth';

import createStore from '../../src/store/configureStore';
import * as s from '../../src/selectors/userSelectors';
const {
  loginComplete,
  setJWT
} = proxyquire('../../src/actions/LoginActionCreators', {
  '../utils/Socket': { auth() {} }
});

describe('reducers/auth', () => {
  it('should not respond to unrelated actions', () => {
    const { dispatch, getState } = createStore();
    expect(s.tokenSelector(getState())).to.be.null;
    dispatch({ type: 'randomOtherAction', payload: {} });
    expect(s.tokenSelector(getState())).to.be.null;
  });
  it('should default to a logged-out session', () => {
    const { getState } = createStore();
    expect(s.tokenSelector(getState())).to.be.null;
    expect(s.currentUserSelector(getState())).to.be.null;
    expect(s.authErrorSelector(getState())).to.be.null;
  });

  describe('action: auth/SET_TOKEN', () => {
    const { dispatch, getState } = createStore();
    it('should set the current session token', () => {
      dispatch(setJWT('test token'));
      expect(s.tokenSelector(getState())).to.equal('test token');
    });
  });

  describe('action: auth/LOGIN_COMPLETE', () => {
    const { dispatch, getState } = createStore();
    it('should set the current user if successful', () => {
      const userObj = { _id: 'test user' };
      dispatch(loginComplete({ jwt: 'test token', user: userObj }));
      expect(s.tokenSelector(getState())).to.equal('test token');
      expect(s.currentUserSelector(getState())).to.eql(userObj);
      expect(s.authErrorSelector(getState())).to.be.null;
    });

    it('should save the error if unsuccessful', () => {
      dispatch({
        type: LOGIN_COMPLETE,
        payload: new Error('failed'),
        error: true
      });
      expect(s.tokenSelector(getState())).to.be.null;
      expect(s.currentUserSelector(getState())).to.be.null;
      expect(s.authErrorSelector(getState()))
        .to.be.instanceof(Error)
        .and.to.have.property('message', 'failed');
    });
  });
});
