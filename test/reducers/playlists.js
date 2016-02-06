import { expect } from 'chai';
import indexBy from 'index-by';
import {
  SELECT_PLAYLIST
} from '../../src/constants/actionTypes/playlists';
import playlists from '../../src/reducers/playlists';

const initialTestState = {
  playlists: indexBy([
    { _id: 1, name: 'Playlist One', size: 50 },
    { _id: 2, name: 'Playlist Two', size: 0 },
    { _id: 3, name: 'Playlist Three', size: 500 },
    { _id: 4, name: 'Playlist Four', size: 120 }
  ], '_id'),
  activePlaylistID: null,
  activeMedia: [],
  selectedPlaylistID: null,
  selectedMedia: []
};

describe('reducers/playlists', () => {
  it('should not respond to unrelated actions', () => {
    let state = { some: 'state' };
    state = playlists(state, { type: 'randomOtherAction', payload: {} });
    expect(state).to.eql({ some: 'state' });
  });

  describe('action: playlists/SELECT_PLAYLIST', () => {
    it('sets the given playlist as the current playlist', () => {
      let state = initialTestState;
      let selectedPlaylist;

      expect(state.selectedPlaylistID).to.be.null;

      state = playlists(state, { type: SELECT_PLAYLIST, payload: { playlistID: 1 } });
      selectedPlaylist = state.playlists[state.selectedPlaylistID];
      expect(state.selectedPlaylistID).to.equal(1);
      expect(selectedPlaylist).to.have.property('selected', true);

      state = playlists(state, { type: SELECT_PLAYLIST, payload: { playlistID: 3 } });
      selectedPlaylist = state.playlists[state.selectedPlaylistID];
      expect(state.selectedPlaylistID).to.equal(3);
      expect(selectedPlaylist).to.have.property('selected', true);
    });
  });

  describe('action: playlists/LOAD_PLAYLIST', () => {
    let state = playlists(undefined, { type: '@@redux/INIT' });
  });
});
