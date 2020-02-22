import { expect } from 'chai';
import { openOverlay, closeAll, toggleOverlay } from '../../actions/OverlayActionCreators';
import createStore from '../../store/configureStore';

describe('reducers/activeOverlay', () => {
  it('should not respond to unrelated actions', () => {
    const { dispatch, getState } = createStore();
    expect(getState().activeOverlay).to.equal(null);
    dispatch({ type: 'randomOtherAction', payload: {} });
    expect(getState().activeOverlay).to.equal(null);
  });

  describe('action: overlay/OPEN_OVERLAY', () => {
    it('should set the current overlay', () => {
      const { dispatch, getState } = createStore();
      dispatch(openOverlay('playlistManager'));
      expect(getState().activeOverlay).to.equal('playlistManager');
      dispatch(openOverlay('settings'));
      expect(getState().activeOverlay).to.equal('settings');
    });
  });

  describe('action: overlay/CLOSE_OVERLAY', () => {
    it('should close the current overlay', () => {
      const { dispatch, getState } = createStore();
      dispatch(openOverlay('playlistManager'));
      expect(getState().activeOverlay).to.equal('playlistManager');
      dispatch(closeAll());
      expect(getState().activeOverlay).to.not.exist;
    });
  });

  describe('action: overlay/TOGGLE_OVERLAY', () => {
    const { dispatch, getState } = createStore();

    it('should open the given overlay if no overlay is open', () => {
      expect(getState().activeOverlay).to.not.exist;
      dispatch(toggleOverlay('playlistManager'));
      expect(getState().activeOverlay).to.equal('playlistManager');
    });

    it('should close the given overlay if it is currently open', () => {
      expect(getState().activeOverlay).to.equal('playlistManager');
      dispatch(toggleOverlay('playlistManager'));
      expect(getState().activeOverlay).to.not.exist;
    });

    it('should switch to the given overlay if another overlay is already open', () => {
      dispatch(openOverlay('playlistManager'));
      expect(getState().activeOverlay).to.equal('playlistManager');

      dispatch(toggleOverlay('settings'));
      expect(getState().activeOverlay).to.equal('settings');
    });
  });
});
