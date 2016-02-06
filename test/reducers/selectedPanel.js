import { expect } from 'chai';
import { SELECT_PANEL } from '../../src/constants/actionTypes/panel';
import selectedPanel from '../../src/reducers/selectedPanel';

describe('reducers/selectedPanel', () => {
  it('should default to the chat panel', () => {
    let state;
    state = selectedPanel(state, { type: '@@redux/INIT' });
    expect(state).to.equal('chat');
  });

  it('should not respond to unrelated actions', () => {
    let state = 'room';
    state = selectedPanel(state, { type: 'randomOtherAction', payload: {} });
    expect(state).to.equal('room');
  });

  describe('action: panel/SELECT_PANEL', () => {
    it('should set the current panel', () => {
      let state = 'chat';
      state = selectedPanel(state, { type: SELECT_PANEL, payload: { panel: 'room' } });
      expect(state).to.equal('room');
      state = selectedPanel(state, { type: SELECT_PANEL, payload: { panel: 'waitlist' } });
      expect(state).to.equal('waitlist');
    });
  });
});
