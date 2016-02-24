import { expect } from 'chai';
import { OPEN_ADD_MEDIA_MENU } from '../../src/constants/actionTypes/playlists';
import { closeAddMediaMenu } from '../../src/actions/PlaylistActionCreators';
import addToPlaylistMenu from '../../src/reducers/addToPlaylistMenu';

describe('reducers/addToPlaylistMenu', () => {
  const initialState = () => addToPlaylistMenu(undefined, { type: '@@redux/INIT' });
  it('should default to a closed context menu', () => {
    const state = addToPlaylistMenu(undefined, { type: '@@redux/INIT' });
    expect(state).to.eql({
      open: false,
      position: { x: 0, y: 0 },
      playlists: [],
      type: null,
      data: null
    });
  });

  describe('action: playlists/OPEN_ADD_MEDIA_MENU', () => {
    it('should open the menu at the given position with the given media', () => {
      let state = initialState();
      state = addToPlaylistMenu(state, {
        type: OPEN_ADD_MEDIA_MENU,
        payload: {
          media: [ { _id: 'mmedia' } ]
        },
        meta: {
          type: 'favorite',
          position: { x: 800, y: 300 },
          playlists: [ { _id: 'pplaylist' } ]
        }
      });
      expect(state.data).to.eql({
        media: [ { _id: 'mmedia' } ]
      });
      expect(state.open).to.be.true;
      expect(state.type).to.equal('favorite');
      expect(state.position).to.eql({ x: 800, y: 300 });
      expect(state.playlists).to.eql([ { _id: 'pplaylist' } ]);
    });
  });

  describe('action: overlay/CLOSE_ADD_MEDIA_MENU', () => {
    it('should close the menu', () => {
      let state = {
        open: true,
        position: { x: 800, y: 300 },
        playlists: [],
        type: 'add',
        data: {
          media: [ { _id: 'hoi' } ]
        }
      };
      state = addToPlaylistMenu(state, closeAddMediaMenu());
      expect(state.open).to.be.false;
      expect(state.playlists).to.have.length(0);
      expect(state.data).to.be.null;
    });
  });
});
