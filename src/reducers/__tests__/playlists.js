import createStore from '../../redux/configureStore';
import * as a from '../../actions/PlaylistActionCreators';
import { favoriteMediaComplete } from '../../actions/VoteActionCreators';
import * as s from '../../selectors/playlistSelectors';

const initialiseStore = a.setPlaylists([
  { _id: 'ZcU_8-UyI10Tx79R4CjRv', name: 'Playlist One', size: 5 },
  { _id: 'rOIrcr6zD06gVH-fg4G4k', name: 'Playlist Two', size: 0 },
  { _id: 'Kzy3kUckOgAV7iwrekHSE', name: 'Playlist Three', size: 500 },
  { _id: 'pKOr6JXTznTa1Y5g99LKH', name: 'Playlist Four', size: 120 },
]);

const initialisePlaylist = (dispatch) => {
  const items = [
    { _id: 'Cnun9zo6oNr1wMCFRhnaO', artist: 'Taylor Swift', title: 'New Romantics' },
    { _id: 'PD_n42XxNCdQjDy5VB_SE', artist: 'Swiimers', title: 'Polaris' },
    { _id: '66Z6y6JA4m5WmmNF3O7Ii', artist: 'of Montreal', title: 'Gronlandic Edit' },
    { _id: 'NkwUIwNmraSZ4A4eiC3GQ', artist: 'Angel Haze', title: 'A Tribe Called Red' },
    { _id: 'BeevKCM1NnNeW91leyLZu', artist: 'tricot', title: '99.974°C' },
  ];
  const playlistID = 'ZcU_8-UyI10Tx79R4CjRv';
  dispatch(a.loadPlaylistComplete(playlistID, items, { page: 0, pageSize: 5 }));
  dispatch(a.selectPlaylist(playlistID));
  return { items, playlistID };
};

describe('reducers/playlists', () => {
  it('should not respond to unrelated actions', () => {
    const { dispatch, getState } = createStore();
    expect(s.playlistsSelector(getState())).toEqual([]);
    dispatch({ type: 'randomOtherAction', payload: {} });
    expect(s.playlistsSelector(getState())).toEqual([]);
  });

  describe('action: playlists/SELECT_PLAYLIST', () => {
    it('sets the given playlist as the current playlist', () => {
      const { dispatch, getState } = createStore();
      dispatch(initialiseStore);

      expect(s.selectedPlaylistIDSelector(getState())).toBeNull();

      dispatch(a.selectPlaylist('ZcU_8-UyI10Tx79R4CjRv'));
      expect(s.selectedPlaylistIDSelector(getState())).toBe('ZcU_8-UyI10Tx79R4CjRv');
      expect(s.selectedPlaylistSelector(getState())).toHaveProperty('_id', 'ZcU_8-UyI10Tx79R4CjRv');

      dispatch(a.selectPlaylist('Kzy3kUckOgAV7iwrekHSE'));
      expect(s.selectedPlaylistIDSelector(getState())).toBe('Kzy3kUckOgAV7iwrekHSE');
      expect(s.selectedPlaylistSelector(getState())).toHaveProperty('_id', 'Kzy3kUckOgAV7iwrekHSE');

      dispatch(a.selectPlaylist(null));
      expect(s.selectedPlaylistIDSelector(getState())).toBeNull();
      expect(s.selectedPlaylistSelector(getState())).toBeNull();
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

      expect(s.selectedPlaylistSelector(getState()).media).toHaveLength(5);

      dispatch(a.addMediaComplete('ZcU_8-UyI10Tx79R4CjRv', '66Z6y6JA4m5WmmNF3O7Ii', {
        afterID: 'NkwUIwNmraSZ4A4eiC3GQ',
        media: [
          { _id: 'VlaaQAxk_Qy5orK1Vcr2C', artist: 'The Microphones', title: 'I Want Wind To Blow' },
          { _id: 'T9sdCu_-3o70qWk0YeDxJ', artist: 'Bikini Kill', title: 'Rebel Girl' },
        ],
      }));

      const { media } = s.selectedPlaylistSelector(getState());
      expect(media).toHaveLength(7);
      expect(media.map((playlistItem) => playlistItem._id)).toEqual([
        'Cnun9zo6oNr1wMCFRhnaO', 'PD_n42XxNCdQjDy5VB_SE', '66Z6y6JA4m5WmmNF3O7Ii', 'NkwUIwNmraSZ4A4eiC3GQ', 'VlaaQAxk_Qy5orK1Vcr2C', 'T9sdCu_-3o70qWk0YeDxJ', 'BeevKCM1NnNeW91leyLZu',
      ]);
    });

    it('should update the Next Media selector when songs are prepended', () => {
      const { dispatch, getState } = createStore();
      dispatch(initialiseStore);
      const { playlistID } = dispatch(initialisePlaylist);
      // Test an active, but not selected playlist.
      dispatch(a.selectPlaylist(null));
      dispatch(a.activatePlaylistComplete(playlistID));

      expect(s.activePlaylistSelector(getState()).media).toHaveLength(5);

      dispatch(a.addMediaComplete('ZcU_8-UyI10Tx79R4CjRv', '66Z6y6JA4m5WmmNF3O7Ii', {
        afterID: null,
        media: [
          { _id: 'VlaaQAxk_Qy5orK1Vcr2C', artist: 'The Microphones', title: 'I Want Wind To Blow' },
          { _id: 'T9sdCu_-3o70qWk0YeDxJ', artist: 'Bikini Kill', title: 'Rebel Girl' },
        ],
      }));

      expect(s.activePlaylistSelector(getState()).media).toHaveLength(7);
      expect(s.nextMediaSelector(getState())._id).toEqual('VlaaQAxk_Qy5orK1Vcr2C');
    });

    it('appends favourited items to the end of the playlist', () => {
      const { dispatch, getState } = createStore();
      dispatch(initialiseStore);
      const { playlistID } = dispatch(initialisePlaylist);

      expect(s.selectedPlaylistSelector(getState()).media).toHaveLength(5);

      dispatch(favoriteMediaComplete(playlistID, 'vGA5mxhJpYkrsHSfxPcqX', {
        playlistSize: 6,
        added: [
          { _id: 'RDeVBExmCGXvmT0mN0P3n', artist: 'SHINee', title: 'Odd Eye' },
        ],
      }));

      const { size, media } = s.selectedPlaylistSelector(getState());
      expect(size).toEqual(6);
      expect(media).toHaveLength(6);
      expect(media[5]._id).toEqual('RDeVBExmCGXvmT0mN0P3n');
    });
  });

  describe('action: playlists/MOVE_MEDIA', () => {
    it('should move playlist items', () => {
      const { dispatch, getState } = createStore();
      dispatch(initialiseStore);
      const { items } = dispatch(initialisePlaylist);

      expect(s.selectedPlaylistSelector(getState()).media).toHaveLength(5);

      dispatch(a.moveMediaComplete(
        'ZcU_8-UyI10Tx79R4CjRv',
        [items[1], items[2]],
        { after: 'NkwUIwNmraSZ4A4eiC3GQ' },
      ));

      const selectedItemIDs = s.selectedPlaylistSelector(getState()).media
        .map((playlistItem) => playlistItem._id);
      expect(selectedItemIDs).toEqual(['Cnun9zo6oNr1wMCFRhnaO', 'NkwUIwNmraSZ4A4eiC3GQ', 'PD_n42XxNCdQjDy5VB_SE', '66Z6y6JA4m5WmmNF3O7Ii', 'BeevKCM1NnNeW91leyLZu']);
    });

    it('should move playlist items in a sparse playlist', () => {
      const { dispatch, getState } = createStore();
      dispatch(initialiseStore);
      const items = [
        { _id: 'Cnun9zo6oNr1wMCFRhnaO', artist: 'Taylor Swift', title: 'New Romantics' },
        { _id: 'PD_n42XxNCdQjDy5VB_SE', artist: 'Swiimers', title: 'Polaris' },
        null,
        { _id: 'NkwUIwNmraSZ4A4eiC3GQ', artist: 'Angel Haze', title: 'A Tribe Called Red' },
        { _id: 'BeevKCM1NnNeW91leyLZu', artist: 'tricot', title: '99.974°C' },
      ];
      dispatch(a.loadPlaylistComplete('ZcU_8-UyI10Tx79R4CjRv', items, { page: 0, pageSize: 5 }));
      dispatch(a.selectPlaylist('ZcU_8-UyI10Tx79R4CjRv'));

      expect(s.selectedPlaylistSelector(getState()).media).toHaveLength(5);

      dispatch(a.moveMediaComplete(
        'ZcU_8-UyI10Tx79R4CjRv',
        [items[0], items[4]],
        { after: 'NkwUIwNmraSZ4A4eiC3GQ' },
      ));

      const getID = (item) => (item ? item._id : null);
      expect(s.selectedPlaylistSelector(getState()).media.map(getID)).toEqual([
        'PD_n42XxNCdQjDy5VB_SE', null, 'NkwUIwNmraSZ4A4eiC3GQ', 'Cnun9zo6oNr1wMCFRhnaO', 'BeevKCM1NnNeW91leyLZu',
      ]);
    });
  });
});
