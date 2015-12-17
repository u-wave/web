import { expect } from 'chai';
import {
  SEND_MESSAGE, RECEIVE_MESSAGE
} from '../src/constants/actionTypes/chat';

import chat from '../src/reducers/chat';

describe('reducers/chat', () => {
  const initialState = () => chat(undefined, { type: '@@redux/INIT' });

  it('should not respond to unrelated actions', () => {
    let state = { messages: [] };
    state = chat(state, { type: 'randomOtherAction', payload: {} });
    expect(state).to.eql({ messages: [] });
  });

  it('should default to an empty list of messages', () => {
    const state = chat(undefined, { type: '@@redux/INIT' });
    expect(state).to.be.an('object');
    expect(state).to.contain.all.keys([ 'messages' ]);
    expect(state.messages).to.be.an('array');
    expect(state.messages).to.be.empty;
  });

  describe('action: chat/RECEIVE_MESSAGE', () => {
    const testMessage = {
      _id: '643abc235-1449941591374',
      userID: '643abc235',
      text: 'Message text',
      timestamp: 1449941591374
    };

    it('should add a message to the messages list', () => {
      let state = initialState();
      expect(state.messages).to.have.length(0);
      state = chat(state, {
        type: RECEIVE_MESSAGE,
        payload: {
          message: testMessage,
          parsed: [ testMessage.text ],
          isMention: false
        }
      });
      expect(state.messages).to.have.length(1);
      expect(state.messages[0]).to.be.an('object');
      [ 'userID', 'text', 'timestamp' ].forEach(key => {
        expect(state.messages[0]).to.have.property(key, testMessage[key]);
      });
      // TODO Just call it parsedText everywhere
      expect(state.messages[0].parsedText).to.eql([ testMessage.text ]);
      expect(state.messages[0]).to.have.property('isMention', false);
      expect(state.messages[0]).to.have.property('inFlight', false);
    });

    it.skip('should remove matching in-flight sent messages', () => {
      // TODO
    });
  });

  describe('action: chat/SEND_MESSAGE', () => {
    const testMessage = {
      user: { _id: '643abc235' },
      message: 'Message text',
      parsed: [ 'Message text' ]
    };

    let dateNow;
    beforeEach(() => {
      dateNow = Date.now();
      Date.now = () => 1251669600000;
    });
    afterEach(() => {
      Date.now = dateNow;
    });

    it('should add an in-flight message to the messages list immediately', () => {
      let state = initialState();
      state = chat(state, { type: SEND_MESSAGE, payload: testMessage });
      expect(state.messages).to.have.length(1);
      expect(state.messages[0]).to.be.an('object');
      // TODO Call this "text" everywhere
      expect(state.messages[0]).to.have.property('text', testMessage.message);
      expect(state.messages[0].parsedText).to.eql(testMessage.parsed);
      expect(state.messages[0]).to.have.property('timestamp', Date.now());
      expect(state.messages[0]).to.have.property('inFlight', true);
    });
  });
});
