import { expect } from 'chai';
import fetch from 'fetch-mock';
import createStore from '../../src/store/configureStore';
import * as a from '../../src/actions/PlaylistActionCreators';
import { favoriteMediaComplete } from '../../src/actions/VoteActionCreators';
import * as s from '../../src/selectors/playlistSelectors';

const initialiseStore = a.setPlaylists([
  { _id: 1, name: 'Playlist One', size: 5 },
  { _id: 2, name: 'Playlist Two', size: 0 },
  { _id: 3, name: 'Playlist Three', size: 500 },
  { _id: 4, name: 'Playlist Four', size: 120 },
]);

const initialisePlaylist = (dispatch) => {
  const items = [
    { _id: 5, artist: 'Taylor Swift', title: 'New Romantics' },
    { _id: 6, artist: 'Swiimers', title: 'Polaris' },
    { _id: 7, artist: 'of Montreal', title: 'Gronlandic Edit' },
    { _id: 8, artist: 'Angel Haze', title: 'A Tribe Called Red' },
    { _id: 9, artist: 'tricot', title: '99.974°C' },
  ];
  const playlistID = 1;
  dispatch(a.loadPlaylistComplete(playlistID, items, { page: 0, pageSize: 5 }));
  dispatch(a.selectPlaylist(playlistID));
  return { items, playlistID };
};

describe('reducers/playlists', () => {
  beforeEach(() => {
    fetch.mock(/\/api\/playlists\/\w+\/media/, {
      meta: {},
      data: [],
    });
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

      expect(s.selectedPlaylistIDSelector(getState())).to.be.null;

      dispatch(a.selectPlaylist(1));
      expect(s.selectedPlaylistIDSelector(getState())).to.equal(1);
      expect(s.selectedPlaylistSelector(getState())).to.have.property('selected', true);

      dispatch(a.selectPlaylist(3));
      expect(s.selectedPlaylistIDSelector(getState())).to.equal(3);
      expect(s.selectedPlaylistSelector(getState())).to.have.property('selected', true);

      dispatch(a.selectPlaylist(null));
      expect(s.selectedPlaylistIDSelector(getState())).to.be.null;
      expect(s.selectedPlaylistSelector(getState())).to.be.null;
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

  describe('action: playlists/ADD_MEDIA', () => {
    it('should insert playlist items in the correct place', () => {
      const { dispatch, getState } = createStore();
      dispatch(initialiseStore);
      dispatch(initialisePlaylist);

      expect(s.selectedPlaylistSelector(getState()).media).to.have.length(5);

      dispatch(a.addMediaComplete(1, 7, {
        afterID: 8,
        media: [
          { _id: 347, artist: 'The Microphones', title: 'I Want Wind To Blow' },
          { _id: 764, artist: 'Bikini Kill', title: 'Rebel Girl' },
        ],
      }));

      const { media } = s.selectedPlaylistSelector(getState());
      expect(media).to.have.length(7);
      expect(media.map(playlistItem => playlistItem._id)).to.eql([
        5, 6, 7, 8, 347, 764, 9,
      ]);
    });

    it('should update the Next Media selector when songs are prepended', () => {
      const { dispatch, getState } = createStore();
      dispatch(initialiseStore);
      const { playlistID } = dispatch(initialisePlaylist);
      // Test an active, but not selected playlist.
      dispatch(a.selectPlaylist(null));
      dispatch(a.activatePlaylistComplete(playlistID));

      expect(s.activePlaylistSelector(getState()).media).to.have.length(5);

      dispatch(a.addMediaComplete(1, 7, {
        afterID: null,
        media: [
          { _id: 347, artist: 'The Microphones', title: 'I Want Wind To Blow' },
          { _id: 764, artist: 'Bikini Kill', title: 'Rebel Girl' },
        ],
      }));

      expect(s.activePlaylistSelector(getState()).media).to.have.length(7);
      expect(s.nextMediaSelector(getState())._id).to.eql(347);
    });

    it('appends favourited items to the end of the playlist', () => {
      const { dispatch, getState } = createStore();
      dispatch(initialiseStore);
      const { playlistID } = dispatch(initialisePlaylist);

      expect(s.selectedPlaylistSelector(getState()).media).to.have.length(5);

      dispatch(favoriteMediaComplete(playlistID, 36425, {
        playlistSize: 6,
        added: [
          { _id: 1338, artist: 'SHINee', title: 'Odd Eye' },
        ],
      }));

      const { size, media } = s.selectedPlaylistSelector(getState());
      expect(size).to.eql(6);
      expect(media).to.have.length(6);
      expect(media[5]._id).to.eql(1338);
    });
  });

  describe('action: playlists/MOVE_MEDIA', () => {
    it('should move playlist items', () => {
      const { dispatch, getState } = createStore();
      dispatch(initialiseStore);
      const { items } = dispatch(initialisePlaylist);

      expect(s.selectedPlaylistSelector(getState()).media).to.have.length(5);

      dispatch(a.moveMediaComplete(
        1,
        [items[1], items[2]],
        { after: 8 },
      ));

      const selectedItemIDs = s.selectedPlaylistSelector(getState()).media
        .map(playlistItem => playlistItem._id);
      expect(selectedItemIDs).to.eql([5, 8, 6, 7, 9]);
    });

    it('should move playlist items in a sparse playlist', () => {
      const { dispatch, getState } = createStore();
      dispatch(initialiseStore);
      const items = [
        { _id: 5, artist: 'Taylor Swift', title: 'New Romantics' },
        { _id: 6, artist: 'Swiimers', title: 'Polaris' },
        null,
        { _id: 8, artist: 'Angel Haze', title: 'A Tribe Called Red' },
        { _id: 9, artist: 'tricot', title: '99.974°C' },
      ];
      dispatch(a.loadPlaylistComplete(1, items, { page: 0, pageSize: 5 }));
      dispatch(a.selectPlaylist(1));

      expect(s.selectedPlaylistSelector(getState()).media).to.have.length(5);

      dispatch(a.moveMediaComplete(
        1,
        [items[0], items[4]],
        { after: 8 },
      ));

      const getID = item => (item ? item._id : null);
      expect(s.selectedPlaylistSelector(getState()).media.map(getID)).to.eql([
        6, null, 8, 5, 9,
      ]);
    });
  });
});
