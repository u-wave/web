import { initState } from '../auth';
import booth, { advance } from '../booth';

const EMPTY_STATE = {
  upvotes: [],
  downvotes: [],
  favorites: [],
};

// NOTE this whole test is super janky because it didn't use to be
// part of the booth state. The state objects in this test are very incomplete
// and tied to what the booth reducer minimally expects.
describe('reducers/votes', () => {
  const initialState = () => booth(undefined, { type: '@@redux/INIT' });
  it('should not respond to unrelated actions', () => {
    let state = {
      stats: {
        upvotes: ['JL2G9-1Hc8p80_AxlcwZC'],
      },
    };
    state = booth(state, { type: 'randomOtherAction', payload: {} });
    expect(state.stats.upvotes).toEqual(['JL2G9-1Hc8p80_AxlcwZC']);
  });

  it('should be null if the booth is empty', () => {
    const state = booth(undefined, { type: '@@redux/INIT' });
    expect(state.stats).toEqual(null);
  });

  describe('action: auth/initState', () => {
    let state = initialState();

    it('should load in votes from the init endpoint', () => {
      state = booth(state, initState.fulfilled({
        booth: {
          media: {},
          stats: {
            upvotes: ['JL2G9-1Hc8p80_AxlcwZC'],
            downvotes: [],
            favorites: ['0slaUXdWdE3Pz4cbjocYV'],
          },
        },
      }));

      expect(state.stats).toEqual({
        upvotes: ['JL2G9-1Hc8p80_AxlcwZC'],
        downvotes: [],
        favorites: ['0slaUXdWdE3Pz4cbjocYV'],
      });
    });

    it('should be null if the booth is empty', () => {
      state = booth(state, initState.fulfilled({
        booth: null,
      }));

      expect(state.stats).toEqual(null);
    });
  });

  describe('action: booth/advance', () => {
    it('should reset votes state', () => {
      const state = booth({
        upvotes: ['nFy0Ts_UqrsUx8ddipZG9', 'OAxkeiBoNXWnejk9bPjpp'],
        downvotes: ['HE1HhtApndA-kpB8KeI6m'],
        favorites: ['JL2G9-1Hc8p80_AxlcwZC', '0slaUXdWdE3Pz4cbjocYV'],
      }, advance({
        historyID: 'E1YirtFAC9erLKDION4J0',
        userID: 'kxZex8C4IQ97YnPuOQezB',
        media: { artist: 'about tess', title: 'Imaginedit' },
        timestamp: 1449767164107,
      }));
      expect(state.stats).toEqual(EMPTY_STATE);
    });
  });
});
