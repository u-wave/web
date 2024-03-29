import createStore from '../../redux/configureStore';
import * as s from '../auth';

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
      dispatch(s.setSessionToken('test token'));
      expect(s.tokenSelector(getState())).toBe('test token');
    });
  });
});
