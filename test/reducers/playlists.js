import { expect } from 'chai';
import fetch from 'fetch-mock';

import createStore from '../../src/store/configureStore';
import * as a from '../../src/actions/PlaylistActionCreators';
import * as s from '../../src/selectors/playlistSelectors';

const initialiseStore = a.setPlaylists([
  { _id: 1, name: 'Playlist One', size: 50 },
  { _id: 2, name: 'Playlist Two', size: 0 },
  { _id: 3, name: 'Playlist Three', size: 500 },
  { _id: 4, name: 'Playlist Four', size: 120 }
]);

describe('reducers/playlists', () => {
  beforeEach(() => {
    fetch.mock(/\/v1\/playlists\/\w+\/media/, []);
  });
  afterEach(() => {
    fetch.restore();
  });

  it('should not respond to unrelated actions', () => {
    const { dispatch, getState } = createStore();
    expect(s.playlistsSelector(getState())).to.eql([]);
    dispatch({ type: 'randomOtherAction', payload: {} });
    expect(s.playlistsSelector(getState())).to.eql([]);
  });

  describe('action: playlists/SELECT_PLAYLIST', () => {
    it('sets the given playlist as the current playlist', () => {
      const { dispatch, getState } = createStore();
      dispatch(initialiseStore);

      expect(
        s.selectedPlaylistIDSelector(getState())
      ).to.be.null;

      dispatch(a.selectPlaylist(1));
      expect(
        s.selectedPlaylistIDSelector(getState())
      ).to.equal(1);
      expect(
        s.selectedPlaylistSelector(getState())
      ).to.have.property('selected', true);

      dispatch(a.selectPlaylist(3));
      expect(
        s.selectedPlaylistIDSelector(getState())
      ).to.equal(3);
      expect(
        s.selectedPlaylistSelector(getState())
      ).to.have.property('selected', true);

      dispatch(a.selectPlaylist(null));
      expect(
        s.selectedPlaylistIDSelector(getState())
      ).to.be.null;
      expect(
        s.selectedPlaylistSelector(getState())
      ).to.be.null;
    });

    it('loads playlist items for a newly selected playlist', () => {
      const { dispatch } = createStore();
      dispatch(initialiseStore);

      dispatch(a.selectPlaylist(1));

      expect(fetch.called()).to.be.true;
    });

    it('does not attempt to playlist items when deselecting a playlist', () => {
      const { dispatch } = createStore();
      dispatch(initialiseStore);

      dispatch(a.selectPlaylist(1));
      fetch.reset();
      dispatch(a.selectPlaylist(null));

      expect(fetch.called()).to.be.false;
    });
  });

  describe('action: playlists/LOAD_PLAYLIST', () => {
    // Nothing yet
  });
});
