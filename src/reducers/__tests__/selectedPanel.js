import { expect } from 'chai';
import { selectPanel } from '../../actions/PanelSelectActionCreators';
import selectedPanel from '../selectedPanel';

describe('reducers/selectedPanel', () => {
  it('should default to the chat panel', () => {
    const state = selectedPanel(undefined, { type: '@@redux/INIT' });
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
      state = selectedPanel(state, selectPanel('room'));
      expect(state).to.equal('room');
      state = selectedPanel(state, selectPanel('waitlist'));
      expect(state).to.equal('waitlist');
    });
  });
});
