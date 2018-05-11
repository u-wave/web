import { expect } from 'chai';
import { ADVANCE } from '../../src/constants/ActionTypes';
import { advanceToEmpty } from '../../src/actions/BoothActionCreators';
import booth from '../../src/reducers/booth';

describe('reducers/booth', () => {
  const initialState = () => booth(undefined, { type: '@@redux/INIT' });
  it('should not respond to unrelated actions', () => {
    let state = { historyID: 'someRandomID' };
    state = booth(state, { type: 'randomOtherAction', payload: {} });
    expect(state.historyID).to.equal('someRandomID');
  });

  it('should default to an empty DJ booth', () => {
    const state = booth(undefined, { type: '@@redux/INIT' });
    expect(state).to.eql({
      historyID: null,
      djID: null,
      media: null,
      startTime: null,
      isFullscreen: false,
    });
  });

  describe('action: booth/ADVANCE', () => {
    it('should advance to the next song if there is one', () => {
      // Weirdly, there are two different advance object formats in use
      // client-side.
      // TODO fix that? :P
      const state = booth(initialState(), {
        type: ADVANCE,
        payload: {
          historyID: 'someRandomID',
          userID: 'seventeen',
          media: { artist: 'about tess', title: 'Imaginedit' },
          timestamp: 1449767164107,
        },
      });
      expect(state).to.eql({
        historyID: 'someRandomID',
        djID: 'seventeen',
        media: { artist: 'about tess', title: 'Imaginedit' },
        startTime: 1449767164107,
        isFullscreen: false,
      });
    });

    it('should stop playing if there is no next song', () => {
      const state = booth(initialState(), advanceToEmpty());
      expect(state).to.eql({
        historyID: null,
        djID: null,
        media: null,
        startTime: null,
        isFullscreen: false,
      });
    });
  });
});
