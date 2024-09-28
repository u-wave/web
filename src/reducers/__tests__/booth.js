import booth, { advanceInner } from '../booth';

describe('reducers/booth', () => {
  const initialState = () => booth(undefined, { type: '@@redux/INIT' });
  it('should not respond to unrelated actions', () => {
    let state = { historyID: 'someRandomID' };
    state = booth(state, { type: 'randomOtherAction', payload: {} });
    expect(state.historyID).toBe('someRandomID');
  });

  it('should default to an empty DJ booth', () => {
    const state = booth(undefined, { type: '@@redux/INIT' });
    expect(state).toEqual({
      autoLeave: null,
      historyID: null,
      djID: null,
      media: null,
      startTime: null,
      stats: null,
      isFullscreen: false,
    });
  });

  describe('action: booth/advance', () => {
    it('should advance to the next song if there is one', () => {
      // Weirdly, there are two different advance object formats in use
      // client-side.
      // TODO fix that? :P
      const state = booth(initialState(), advanceInner({
        historyID: 'someRandomID',
        userID: 'seventeen',
        media: { artist: 'about tess', title: 'Imaginedit' },
        timestamp: 1449767164107,
      }));
      expect(state).toEqual({
        autoLeave: null,
        historyID: 'someRandomID',
        djID: 'seventeen',
        media: { artist: 'about tess', title: 'Imaginedit' },
        startTime: 1449767164107,
        stats: {
          upvotes: [],
          downvotes: [],
          favorites: [],
        },
        isFullscreen: false,
      });
    });

    it('should stop playing if there is no next song', () => {
      const state = booth(initialState(), advanceInner(null));
      expect(state).toEqual({
        autoLeave: null,
        historyID: null,
        djID: null,
        media: null,
        startTime: null,
        stats: null,
        isFullscreen: false,
      });
    });
  });
});
