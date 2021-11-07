import createStore from '../../redux/configureStore';
import { addMediaMenu, closeAddMediaMenu } from '../../actions/PlaylistActionCreators';
import * as s from '../../selectors/addToPlaylistMenuSelectors';

describe('reducers/addToPlaylistMenu', () => {
  it('should default to a closed context menu', () => {
    const { getState } = createStore();
    expect(s.addToPlaylistMenuSelector(getState())).toEqual({
      type: null,
      open: false,
      position: { x: 0, y: 0 },
      playlists: [],
    });
  });

  describe('action: playlists/OPEN_ADD_MEDIA_MENU', () => {
    const { dispatch, getState } = createStore();
    it('should open the menu at the given position with the given media', () => {
      dispatch(addMediaMenu(
        [{ _id: 'mmedia' }],
        { x: 800, y: 300 },
      ));
      expect(s.mediaSelector(getState())).toEqual([{ _id: 'mmedia' }]);
      expect(s.isOpenSelector(getState())).toBe(true);
      expect(s.isFavoriteSelector(getState())).toBe(false);
      expect(s.positionSelector(getState())).toEqual({ x: 800, y: 300 });
    });
  });

  describe('action: playlists/CLOSE_ADD_MEDIA_MENU', () => {
    const { dispatch, getState } = createStore();
    it('should close the menu', () => {
      dispatch(addMediaMenu(
        [{ _id: 'mmedia' }],
        { x: 800, y: 300 },
      ));
      expect(s.isOpenSelector(getState())).toBe(true);

      dispatch(closeAddMediaMenu());
      expect(s.isOpenSelector(getState())).toBe(false);
    });
  });
});
