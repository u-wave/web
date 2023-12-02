import createStore from '../../redux/configureStore';
import {
  open,
  close,
  isOpenSelector,
  isFavoriteSelector,
  positionSelector,
  mediaSelector,
} from '../addToPlaylistMenu';

describe('reducers/addToPlaylistMenu', () => {
  it('should default to a closed context menu', () => {
    const { getState } = createStore();
    expect(isOpenSelector(getState())).toBe(false);
  });

  describe('action: open', () => {
    const { dispatch, getState } = createStore();
    it('should open the menu at the given position with the given media', () => {
      dispatch(open({
        type: 'add',
        position: { x: 800, y: 300 },
        data: { media: [{ _id: 'mmedia' }] },
      }));
      expect(mediaSelector(getState())).toEqual([{ _id: 'mmedia' }]);
      expect(isOpenSelector(getState())).toBe(true);
      expect(isFavoriteSelector(getState())).toBe(false);
      expect(positionSelector(getState())).toEqual({ x: 800, y: 300 });
    });
  });

  describe('action: close', () => {
    const { dispatch, getState } = createStore();
    it('should close the menu', () => {
      dispatch(open(
        [{ _id: 'mmedia' }],
        { x: 800, y: 300 },
      ));
      expect(isOpenSelector(getState())).toBe(true);

      dispatch(close());
      expect(isOpenSelector(getState())).toBe(false);
    });
  });
});
