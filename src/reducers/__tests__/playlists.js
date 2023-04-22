import createStore from '../../redux/configureStore';
import * as a from '../../actions/PlaylistActionCreators';
import { favoriteMediaComplete } from '../../actions/VoteActionCreators';
import * as s from '../../selectors/playlistSelectors';
import {
  activatePlaylist,
  addPlaylistItems,
  movePlaylistItems,
  selectPlaylist,
} from '../playlists';

function preloadPlaylists(playlists) {
  return {
    playlists: {
      playlists: Object.fromEntries(playlists.map((playlist) => [playlist._id, playlist])),
      playlistItems: {},
      activePlaylistID: null,
      selectedPlaylistID: null,
      currentFilter: null,
    },
  };
}
const testPlaylists = [
  { _id: 'ZcU_8-UyI10Tx79R4CjRv', name: 'Playlist One', size: 5 },
  { _id: 'rOIrcr6zD06gVH-fg4G4k', name: 'Playlist Two', size: 0 },
  { _id: 'Kzy3kUckOgAV7iwrekHSE', name: 'Playlist Three', size: 500 },
  { _id: 'pKOr6JXTznTa1Y5g99LKH', name: 'Playlist Four', size: 120 },
];

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
  dispatch(selectPlaylist(playlistID));
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
      const { dispatch, getState } = createStore(preloadPlaylists(testPlaylists));

      expect(s.selectedPlaylistIDSelector(getState())).toBeNull();

      dispatch(selectPlaylist('ZcU_8-UyI10Tx79R4CjRv'));
      expect(s.selectedPlaylistIDSelector(getState())).toBe('ZcU_8-UyI10Tx79R4CjRv');
      expect(s.selectedPlaylistSelector(getState())).toHaveProperty('_id', 'ZcU_8-UyI10Tx79R4CjRv');

      dispatch(selectPlaylist('Kzy3kUckOgAV7iwrekHSE'));
      expect(s.selectedPlaylistIDSelector(getState())).toBe('Kzy3kUckOgAV7iwrekHSE');
      expect(s.selectedPlaylistSelector(getState())).toHaveProperty('_id', 'Kzy3kUckOgAV7iwrekHSE');

      dispatch(selectPlaylist(null));
      expect(s.selectedPlaylistIDSelector(getState())).toBeNull();
      expect(s.selectedPlaylistSelector(getState())).toBeNull();
    });
  });

  describe('action: playlists/ADD_MEDIA', () => {
    it('should insert playlist items in the correct place', () => {
      const { dispatch, getState } = createStore(preloadPlaylists(testPlaylists));
      dispatch(initialisePlaylist);

      expect(s.selectedPlaylistSelector(getState()).media).toHaveLength(5);

      dispatch(addPlaylistItems.fulfilled({
        playlistSize: 7,
        items: [
          { _id: 'VlaaQAxk_Qy5orK1Vcr2C', artist: 'The Microphones', title: 'I Want Wind To Blow' },
          { _id: 'T9sdCu_-3o70qWk0YeDxJ', artist: 'Bikini Kill', title: 'Rebel Girl' },
        ],
      }, '66Z6y6JA4m5WmmNF3O7Ii', {
        playlistID: 'ZcU_8-UyI10Tx79R4CjRv',
        afterID: 'NkwUIwNmraSZ4A4eiC3GQ',
        items: [],
      }));

      const { media } = s.selectedPlaylistSelector(getState());
      expect(media).toHaveLength(7);
      expect(media.map((playlistItem) => playlistItem._id)).toEqual([
        'Cnun9zo6oNr1wMCFRhnaO', 'PD_n42XxNCdQjDy5VB_SE', '66Z6y6JA4m5WmmNF3O7Ii', 'NkwUIwNmraSZ4A4eiC3GQ', 'VlaaQAxk_Qy5orK1Vcr2C', 'T9sdCu_-3o70qWk0YeDxJ', 'BeevKCM1NnNeW91leyLZu',
      ]);
    });

    it('should update the Next Media selector when songs are prepended', () => {
      const { dispatch, getState } = createStore(preloadPlaylists(testPlaylists));
      const { playlistID } = dispatch(initialisePlaylist);
      // Test an active, but not selected playlist.
      dispatch(selectPlaylist(null));
      dispatch(activatePlaylist.fulfilled(null, '', playlistID));

      expect(s.activePlaylistSelector(getState()).media).toHaveLength(5);

      dispatch(addPlaylistItems.fulfilled({
        playlistSize: 7,
        items: [
          { _id: 'VlaaQAxk_Qy5orK1Vcr2C', artist: 'The Microphones', title: 'I Want Wind To Blow' },
          { _id: 'T9sdCu_-3o70qWk0YeDxJ', artist: 'Bikini Kill', title: 'Rebel Girl' },
        ],
      }, '66Z6y6JA4m5WmmNF3O7Ii', {
        playlistID: 'ZcU_8-UyI10Tx79R4CjRv',
        afterID: null,
        items: [],
      }));

      expect(s.activePlaylistSelector(getState()).media).toHaveLength(7);
      expect(s.nextMediaSelector(getState())._id).toBe('VlaaQAxk_Qy5orK1Vcr2C');
    });

    it('appends favourited items to the end of the playlist', () => {
      const { dispatch, getState } = createStore(preloadPlaylists(testPlaylists));
      const { playlistID } = dispatch(initialisePlaylist);

      expect(s.selectedPlaylistSelector(getState()).media).toHaveLength(5);

      dispatch(favoriteMediaComplete(playlistID, 'vGA5mxhJpYkrsHSfxPcqX', {
        playlistSize: 6,
        added: [
          { _id: 'RDeVBExmCGXvmT0mN0P3n', artist: 'SHINee', title: 'Odd Eye' },
        ],
      }));

      const { size, media } = s.selectedPlaylistSelector(getState());
      expect(size).toBe(6);
      expect(media).toHaveLength(6);
      expect(media[5]._id).toBe('RDeVBExmCGXvmT0mN0P3n');
    });
  });

  describe('action: playlists/MOVE_MEDIA', () => {
    it('should move playlist items', () => {
      const { dispatch, getState } = createStore(preloadPlaylists(testPlaylists));
      const { items } = dispatch(initialisePlaylist);

      expect(s.selectedPlaylistSelector(getState()).media).toHaveLength(5);

      dispatch(movePlaylistItems.fulfilled({
        location: { after: 'NkwUIwNmraSZ4A4eiC3GQ' },
      }, '', {
        playlistID: 'ZcU_8-UyI10Tx79R4CjRv',
        medias: [items[1], items[2]],
      }));

      const selectedItemIDs = s.selectedPlaylistSelector(getState()).media
        .map((playlistItem) => playlistItem._id);
      expect(selectedItemIDs).toEqual(['Cnun9zo6oNr1wMCFRhnaO', 'NkwUIwNmraSZ4A4eiC3GQ', 'PD_n42XxNCdQjDy5VB_SE', '66Z6y6JA4m5WmmNF3O7Ii', 'BeevKCM1NnNeW91leyLZu']);
    });

    it('should move playlist items in a sparse playlist', () => {
      const { dispatch, getState } = createStore(preloadPlaylists(testPlaylists));
      const items = [
        { _id: 'Cnun9zo6oNr1wMCFRhnaO', artist: 'Taylor Swift', title: 'New Romantics' },
        { _id: 'PD_n42XxNCdQjDy5VB_SE', artist: 'Swiimers', title: 'Polaris' },
        null,
        { _id: 'NkwUIwNmraSZ4A4eiC3GQ', artist: 'Angel Haze', title: 'A Tribe Called Red' },
        { _id: 'BeevKCM1NnNeW91leyLZu', artist: 'tricot', title: '99.974°C' },
      ];
      dispatch(a.loadPlaylistComplete('ZcU_8-UyI10Tx79R4CjRv', items, { page: 0, pageSize: 5 }));
      dispatch(selectPlaylist('ZcU_8-UyI10Tx79R4CjRv'));

      expect(s.selectedPlaylistSelector(getState()).media).toHaveLength(5);

      dispatch(movePlaylistItems.fulfilled({
        location: { after: 'NkwUIwNmraSZ4A4eiC3GQ' },
      }, '', {
        playlistID: 'ZcU_8-UyI10Tx79R4CjRv',
        medias: [items[0], items[4]],
      }));

      const getID = (item) => (item ? item._id : null);
      expect(s.selectedPlaylistSelector(getState()).media.map(getID)).toEqual([
        'PD_n42XxNCdQjDy5VB_SE', null, 'NkwUIwNmraSZ4A4eiC3GQ', 'Cnun9zo6oNr1wMCFRhnaO', 'BeevKCM1NnNeW91leyLZu',
      ]);
    });
  });
});
