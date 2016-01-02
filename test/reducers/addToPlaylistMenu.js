import { expect } from 'chai';
import {
  OPEN_ADD_MEDIA_MENU, CLOSE_ADD_MEDIA_MENU
} from '../../src/constants/actionTypes/playlists';
import addToPlaylistMenu from '../../src/reducers/addToPlaylistMenu';

describe('reducers/addToPlaylistMenu', () => {
  const initialState = () => addToPlaylistMenu(undefined, { type: '@@redux/INIT' });
  it('should default to a closed context menu', () => {
    const state = addToPlaylistMenu(undefined, { type: '@@redux/INIT' });
    expect(state).to.eql({
      open: false,
      position: { x: 0, y: 0 },
      media: []
    });
  });

  describe('action: playlists/OPEN_ADD_MEDIA_MENU', () => {
    it('should open the menu at the given position with the given media', () => {
      let state = initialState();
      state = addToPlaylistMenu(state, {
        type: OPEN_ADD_MEDIA_MENU,
        payload: {
          position: { x: 800, y: 300 },
          media: [ { _id: 'hoi' } ]
        }
      });
      expect(state).to.eql({
        open: true,
        position: { x: 800, y: 300 },
        media: [ { _id: 'hoi' } ]
      });
    });
  });

  describe('action: overlay/CLOSE_ADD_MEDIA_MENU', () => {
    it('should close the menu', () => {
      let state = {
        open: true,
        position: { x: 800, y: 300 },
        media: [ { _id: 'hoi' } ]
      };
      state = addToPlaylistMenu(state, { type: CLOSE_ADD_MEDIA_MENU });
      expect(state.open).to.be.false;
      expect(state.media).to.have.length(0);
    });
  });
});
