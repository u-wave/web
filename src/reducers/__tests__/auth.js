import { expect } from 'chai';
import { LOGIN_COMPLETE } from '../../constants/ActionTypes';
import createStore from '../../store/configureStore';
import * as s from '../../selectors/userSelectors';
import { loginComplete, setSessionToken } from '../../actions/LoginActionCreators';
import { setUsers } from '../../actions/UserActionCreators';

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
      dispatch(setSessionToken('test token'));
      expect(s.tokenSelector(getState())).to.equal('test token');
    });
  });

  describe('action: auth/LOGIN_COMPLETE', () => {
    const { dispatch, getState } = createStore();
    it('should set the current user if successful', () => {
      const userObj = { _id: 'test user' };
      dispatch(setUsers([userObj]));
      dispatch(loginComplete({ token: 'test token', user: userObj }));
      expect(s.tokenSelector(getState())).to.equal('test token');
      expect(s.currentUserSelector(getState())).to.eql(userObj);
      expect(s.authErrorSelector(getState())).to.be.null;
    });

    it('should save the error if unsuccessful', () => {
      dispatch({
        type: LOGIN_COMPLETE,
        payload: new Error('failed'),
        error: true,
      });
      expect(s.tokenSelector(getState())).to.be.null;
      expect(s.currentUserSelector(getState())).to.be.null;
      expect(s.authErrorSelector(getState()))
        .to.be.instanceof(Error)
        .and.to.have.property('message', 'failed');
    });
  });
});
