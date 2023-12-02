import {
  openOverlay,
  closeOverlay,
  toggleOverlay,
  selectOverlay,
} from '../activeOverlay';
import createStore from '../../redux/configureStore';

describe('reducers/activeOverlay', () => {
  it('should not respond to unrelated actions', () => {
    const { dispatch, getState } = createStore();
    expect(selectOverlay(getState())).toBeNull();
    dispatch({ type: 'randomOtherAction', payload: {} });
    expect(selectOverlay(getState())).toBeNull();
  });

  describe('action: openOverlay', () => {
    it('should set the current overlay', () => {
      const { dispatch, getState } = createStore();
      dispatch(openOverlay('playlistManager'));
      expect(selectOverlay(getState())).toBe('playlistManager');
      dispatch(openOverlay('settings'));
      expect(selectOverlay(getState())).toBe('settings');
    });
  });

  describe('action: closeOverlay', () => {
    it('should close the current overlay', () => {
      const { dispatch, getState } = createStore();
      dispatch(openOverlay('playlistManager'));
      expect(selectOverlay(getState())).toBe('playlistManager');
      dispatch(closeOverlay());
      expect(selectOverlay(getState())).toBeNull();
    });
  });

  describe('action: toggleOverlay', () => {
    const { dispatch, getState } = createStore();

    it('should open the given overlay if no overlay is open', () => {
      expect(selectOverlay(getState())).toBeNull();
      dispatch(toggleOverlay('playlistManager'));
      expect(selectOverlay(getState())).toBe('playlistManager');
    });

    it('should close the given overlay if it is currently open', () => {
      expect(selectOverlay(getState())).toBe('playlistManager');
      dispatch(toggleOverlay('playlistManager'));
      expect(selectOverlay(getState())).toBeNull();
    });

    it('should switch to the given overlay if another overlay is already open', () => {
      dispatch(openOverlay('playlistManager'));
      expect(selectOverlay(getState())).toBe('playlistManager');

      dispatch(toggleOverlay('settings'));
      expect(selectOverlay(getState())).toBe('settings');
    });
  });
});
