import { initState } from '../auth';
import { advance } from '../booth';
import votes from '../votes';

const EMPTY_STATE = {
  upvotes: [],
  downvotes: [],
  favorites: [],
};

describe('reducers/votes', () => {
  const initialState = () => votes(undefined, { type: '@@redux/INIT' });
  it('should not respond to unrelated actions', () => {
    let state = { upvotes: ['JL2G9-1Hc8p80_AxlcwZC'] };
    state = votes(state, { type: 'randomOtherAction', payload: {} });
    expect(state.upvotes).toEqual(['JL2G9-1Hc8p80_AxlcwZC']);
  });

  it('should default to empty vote arrays', () => {
    const state = votes(undefined, { type: '@@redux/INIT' });
    expect(state).toEqual(EMPTY_STATE);
  });

  describe('action: auth/INIT_STATE', () => {
    let state = initialState();

    it('should load in votes from the init endpoint', () => {
      state = votes(state, initState.fulfilled({
        booth: {
          stats: {
            upvotes: ['JL2G9-1Hc8p80_AxlcwZC'],
            downvotes: [],
            favorites: ['0slaUXdWdE3Pz4cbjocYV'],
          },
        },
      }));

      expect(state).toEqual({
        upvotes: ['JL2G9-1Hc8p80_AxlcwZC'],
        downvotes: [],
        favorites: ['0slaUXdWdE3Pz4cbjocYV'],
      });
    });

    it('should clear votes if init endpoint has empty booth', () => {
      state = votes(state, initState.fulfilled({
        booth: null,
      }));

      expect(state).toEqual(EMPTY_STATE);
    });
  });

  describe('action: booth/advance', () => {
    it('should reset votes state', () => {
      const state = votes({
        upvotes: ['nFy0Ts_UqrsUx8ddipZG9', 'OAxkeiBoNXWnejk9bPjpp'],
        downvotes: ['HE1HhtApndA-kpB8KeI6m'],
        favorites: ['JL2G9-1Hc8p80_AxlcwZC', '0slaUXdWdE3Pz4cbjocYV'],
      }, advance({
        historyID: 'E1YirtFAC9erLKDION4J0',
        userID: 'kxZex8C4IQ97YnPuOQezB',
        media: { artist: 'about tess', title: 'Imaginedit' },
        timestamp: 1449767164107,
      }));
      expect(state).toEqual(EMPTY_STATE);
    });
  });
});
