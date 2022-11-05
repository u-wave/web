import { LOGIN_COMPLETE } from '../../constants/ActionTypes';
import createStore from '../../redux/configureStore';
import * as s from '../../selectors/userSelectors';
import { loginComplete, setSessionToken } from '../../actions/LoginActionCreators';
import { setUsers } from '../../actions/UserActionCreators';

describe('reducers/auth', () => {
  it('should not respond to unrelated actions', () => {
    const { dispatch, getState } = createStore();
    expect(s.tokenSelector(getState())).toBeNull();
    dispatch({ type: 'randomOtherAction', payload: {} });
    expect(s.tokenSelector(getState())).toBeNull();
  });
  it('should default to a logged-out session', () => {
    const { getState } = createStore();
    expect(s.tokenSelector(getState())).toBeNull();
    expect(s.currentUserSelector(getState())).toBeNull();
  });

  describe('action: auth/SET_TOKEN', () => {
    const { dispatch, getState } = createStore();
    it('should set the current session token', () => {
      dispatch(setSessionToken('test token'));
      expect(s.tokenSelector(getState())).toBe('test token');
    });
  });

  describe('action: auth/LOGIN_COMPLETE', () => {
    const { dispatch, getState } = createStore();
    it('should set the current user if successful', () => {
      const userObj = { _id: 'test user' };
      dispatch(setUsers([userObj]));
      dispatch(loginComplete({ token: 'test token', user: userObj }));
      expect(s.tokenSelector(getState())).toBe('test token');
      expect(s.currentUserSelector(getState())).toEqual(userObj);
    });

    it('should save the error if unsuccessful', () => {
      dispatch({
        type: LOGIN_COMPLETE,
        payload: new Error('failed'),
        error: true,
      });
      expect(s.tokenSelector(getState())).toBeNull();
      expect(s.currentUserSelector(getState())).toBeNull();
    });
  });
});
