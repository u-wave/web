import { openOverlay, closeAll, toggleOverlay } from '../../actions/OverlayActionCreators';
import createStore from '../../redux/configureStore';

describe('reducers/activeOverlay', () => {
  it('should not respond to unrelated actions', () => {
    const { dispatch, getState } = createStore();
    expect(getState().activeOverlay).toBeNull();
    dispatch({ type: 'randomOtherAction', payload: {} });
    expect(getState().activeOverlay).toBeNull();
  });

  describe('action: overlay/OPEN_OVERLAY', () => {
    it('should set the current overlay', () => {
      const { dispatch, getState } = createStore();
      dispatch(openOverlay('playlistManager'));
      expect(getState().activeOverlay).toEqual('playlistManager');
      dispatch(openOverlay('settings'));
      expect(getState().activeOverlay).toEqual('settings');
    });
  });

  describe('action: overlay/CLOSE_OVERLAY', () => {
    it('should close the current overlay', () => {
      const { dispatch, getState } = createStore();
      dispatch(openOverlay('playlistManager'));
      expect(getState().activeOverlay).toEqual('playlistManager');
      dispatch(closeAll());
      expect(getState().activeOverlay).toBeNull();
    });
  });

  describe('action: overlay/TOGGLE_OVERLAY', () => {
    const { dispatch, getState } = createStore();

    it('should open the given overlay if no overlay is open', () => {
      expect(getState().activeOverlay).toBeNull();
      dispatch(toggleOverlay('playlistManager'));
      expect(getState().activeOverlay).toEqual('playlistManager');
    });

    it('should close the given overlay if it is currently open', () => {
      expect(getState().activeOverlay).toEqual('playlistManager');
      dispatch(toggleOverlay('playlistManager'));
      expect(getState().activeOverlay).toBeNull();
    });

    it('should switch to the given overlay if another overlay is already open', () => {
      dispatch(openOverlay('playlistManager'));
      expect(getState().activeOverlay).toEqual('playlistManager');

      dispatch(toggleOverlay('settings'));
      expect(getState().activeOverlay).toEqual('settings');
    });
  });
});
