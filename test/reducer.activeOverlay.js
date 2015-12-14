import { expect } from 'chai';
import {
  OPEN_OVERLAY, CLOSE_OVERLAY, TOGGLE_OVERLAY
} from '../src/constants/actionTypes/overlay';
import activeOverlay from '../src/reducers/activeOverlay';

describe('reducers/activeOverlay', () => {
  it('should not respond to unrelated actions', () => {
    let state = 'playlistManager';
    state = activeOverlay(state, { type: 'randomOtherAction', payload: {} });
    expect(state).to.equal('playlistManager');
  });

  describe('action: openOverlay', () => {
    it('should set the current overlay', () => {
      let state;
      state = activeOverlay(state, { type: OPEN_OVERLAY, payload: { overlay: 'playlistManager' } });
      expect(state).to.be.a('string');
      expect(state).to.equal('playlistManager');
      state = activeOverlay(state, { type: OPEN_OVERLAY, payload: { overlay: 'settings' } });
      expect(state).to.equal('settings');
    });
  });

  describe('action: closeOverlay', () => {
    it('should close the current overlay', () => {
      let state = 'anOverlay';
      state = activeOverlay(state, { type: CLOSE_OVERLAY });
      expect(state).to.not.exist;
    });
  });

  describe('action: toggleOverlay', () => {
    it('should close the given overlay if it is currently open', () => {
      let state = 'playlistManager';
      state = activeOverlay(state, { type: TOGGLE_OVERLAY, payload: { overlay: 'playlistManager' } });
      expect(state).to.not.exist;
    });
    it('should open the given overlay if no overlay is open', () => {
      let state;
      state = activeOverlay(state, { type: TOGGLE_OVERLAY, payload: { overlay: 'playlistManager' } });
      expect(state).to.equal('playlistManager');
    });
    it('should switch to the given overlay if another overlay is already open', () => {
      let state = 'settings';
      state = activeOverlay(state, { type: TOGGLE_OVERLAY, payload: { overlay: 'playlistManager' } });
      expect(state).to.equal('playlistManager');
    });
  });
});
