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
    expect(state).to.eql({ messages: [] });
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
      expect(state).to.eql({
        messages: [{
          _id: testMessage._id,
          type: 'chat',
          userID: testMessage.userID,
          text: testMessage.text,
          parsedText: [ testMessage.text ],
          timestamp: testMessage.timestamp,
          isMention: false,
          inFlight: false
        }]
      });
    });

    it('should remove matching in-flight sent messages', () => {
      let state = initialState();
      expect(state.messages).to.have.length(0);

      // test setup: start w/ one received message and one that's been sent but
      // is pending.
      state = chat(state, {
        type: RECEIVE_MESSAGE,
        payload: {
          message: testMessage,
          parsed: [ testMessage.text ],
          isMention: false
        }
      });
      expect(state.messages).to.have.length(1);

      const messageText = 'test message 🐼';
      const user = { _id: 'a user id' };
      state = chat(state, {
        type: SEND_MESSAGE,
        payload: {
          user,
          message: messageText,
          parsed: [ messageText ]
        }
      });
      expect(state.messages).to.have.length(2);
      expect(state.messages[1]).to.have.property('inFlight', true);

      // actual test: RECEIVE-ing a sent message should replace that message in
      // the messages list.
      state = chat(state, {
        type: RECEIVE_MESSAGE,
        payload: {
          message: {
            _id: 'a user id-1449941591374',
            userID: user._id,
            text: messageText,
            timestamp: 1449941591374
          },
          parsed: [ messageText ]
        }
      });
      expect(state.messages).to.have.length(2);
      expect(state.messages[1]).to.have.property('inFlight', false);
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
      const message = state.messages[0];
      expect(message).to.be.an('object');
      expect(message).to.have.property('_id');
      expect(message.userID).to.equal(testMessage.user._id);
      // TODO Call this "text" everywhere
      expect(message.text).to.equal(testMessage.message);
      expect(message.parsedText).to.eql(testMessage.parsed);
      expect(message.timestamp).to.equal(Date.now());
      expect(message.inFlight).to.be.true;
    });
  });
});
