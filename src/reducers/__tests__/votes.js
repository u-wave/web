import { expect } from 'chai';
import { INIT_STATE, ADVANCE } from '../../constants/ActionTypes';
import votes from '../votes';

const EMPTY_STATE = {
  upvotes: [],
  downvotes: [],
  favorites: [],
};

describe('reducers/votes', () => {
  const initialState = () => votes(undefined, { type: '@@redux/INIT' });
  it('should not respond to unrelated actions', () => {
    let state = { upvotes: [1] };
    state = votes(state, { type: 'randomOtherAction', payload: {} });
    expect(state.upvotes).to.eql([1]);
  });

  it('should default to empty vote arrays', () => {
    const state = votes(undefined, { type: '@@redux/INIT' });
    expect(state).to.eql(EMPTY_STATE);
  });

  describe('action: auth/INIT_STATE', () => {
    let state = initialState();

    it('should load in votes from the init endpoint', () => {
      state = votes(state, {
        type: INIT_STATE,
        payload: {
          booth: {
            stats: {
              upvotes: [1],
              downvotes: [],
              favorites: [2],
            },
          },
        },
      });

      expect(state).to.eql({
        upvotes: [1],
        downvotes: [],
        favorites: [2],
      });
    });

    it('should clear votes if init endpoint has empty booth', () => {
      state = votes(state, {
        type: INIT_STATE,
        payload: { booth: null },
      });

      expect(state).to.eql(EMPTY_STATE);
    });
  });

  describe('action: booth/ADVANCE', () => {
    it('should reset votes state', () => {
      const state = votes({
        upvotes: [3, 4],
        downvotes: [5],
        favorites: [1, 2],
      }, {
        type: ADVANCE,
        payload: {
          historyID: 'someRandomID',
          userID: 'seventeen',
          media: { artist: 'about tess', title: 'Imaginedit' },
          timestamp: 1449767164107,
        },
      });
      expect(state).to.eql(EMPTY_STATE);
    });
  });
});
