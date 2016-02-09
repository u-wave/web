import { expect } from 'chai';
import { openOverlay, closeAll, toggleOverlay } from '../../src/actions/OverlayActionCreators';
import activeOverlay from '../../src/reducers/activeOverlay';

describe('reducers/activeOverlay', () => {
  it('should not respond to unrelated actions', () => {
    let state = 'playlistManager';
    state = activeOverlay(state, { type: 'randomOtherAction', payload: {} });
    expect(state).to.equal('playlistManager');
  });

  describe('action: overlay/OPEN_OVERLAY', () => {
    it('should set the current overlay', () => {
      let state;
      state = activeOverlay(state, openOverlay('playlistManager'));
      expect(state).to.equal('playlistManager');
      state = activeOverlay(state, openOverlay('settings'));
      expect(state).to.equal('settings');
    });
  });

  describe('action: overlay/CLOSE_OVERLAY', () => {
    it('should close the current overlay', () => {
      let state = 'anOverlay';
      state = activeOverlay(state, closeAll());
      expect(state).to.not.exist;
    });
  });

  describe('action: overlay/TOGGLE_OVERLAY', () => {
    it('should close the given overlay if it is currently open', () => {
      let state = 'playlistManager';
      state = activeOverlay(state, toggleOverlay('playlistManager'));
      expect(state).to.not.exist;
    });
    it('should open the given overlay if no overlay is open', () => {
      let state;
      state = activeOverlay(state, toggleOverlay('playlistManager'));
      expect(state).to.equal('playlistManager');
    });
    it('should switch to the given overlay if another overlay is already open', () => {
      let state = 'settings';
      state = activeOverlay(state, toggleOverlay('playlistManager'));
      expect(state).to.equal('playlistManager');
    });
  });
});
