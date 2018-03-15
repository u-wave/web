import { expect } from 'chai';
import sinon from 'sinon';
import createStore from '../../src/store/configureStore';
import { setUsers } from '../../src/actions/UserActionCreators';
import * as a from '../../src/actions/ChatActionCreators';
import * as s from '../../src/selectors/chatSelectors';
import * as userSelectors from '../../src/selectors/userSelectors';

describe('reducers/chat', () => {
  it('should not respond to unrelated actions', () => {
    const { dispatch, getState } = createStore();
    const initial = s.messagesSelector(getState());
    dispatch({ type: 'randomOtherAction', payload: {} });
    expect(s.messagesSelector(getState())).to.eql(initial);
  });

  it('should default to an empty list of messages', () => {
    const { getState } = createStore();
    expect(s.messagesSelector(getState())).to.eql([]);
  });

  describe('action: chat/RECEIVE_MESSAGE', () => {
    const testMessage = {
      _id: '643abc235-1449941591374',
      userID: '643abc235',
      text: 'Message text',
      timestamp: 1449941591374,
    };
    const testUser = {
      _id: '643abc235',
      username: 'TestUser',
    };

    it('should add a message to the messages list', () => {
      const { dispatch, getState } = createStore();
      dispatch(setUsers([testUser]));

      expect(s.messagesSelector(getState())).to.have.length(0);

      dispatch(a.receive(testMessage));

      expect(s.messagesSelector(getState())[0]).to.eql({
        _id: testMessage._id,
        type: 'chat',
        userID: testMessage.userID,
        user: testUser,
        text: testMessage.text,
        parsedText: [testMessage.text],
        timestamp: testMessage.timestamp,
        isMention: false,
        inFlight: false,
      });
    });

    it('should remove matching in-flight sent messages', () => {
      const inFlightUser = {
        _id: 'a user id',
        username: 'SendingUser',
      };

      sinon.stub(userSelectors, 'currentUserSelector').returns(inFlightUser);

      const { dispatch, getState } = createStore();
      dispatch(setUsers([testUser, inFlightUser]));

      // test setup: start w/ one received message and one that's been sent but
      // is pending.
      dispatch(a.receive(testMessage));

      const messageText = 'test message 🐼';
      dispatch(a.sendChat(messageText));
      expect(s.messagesSelector(getState())).to.have.length(2);
      expect(s.messagesSelector(getState())[1]).to.have.property('inFlight', true);

      // actual test: RECEIVE-ing a sent message should replace that message in
      // the messages list.
      dispatch(a.receive({
        _id: 'a user id-1449941591374',
        userID: inFlightUser._id,
        text: messageText,
        timestamp: 1449941591374,
      }));

      expect(s.messagesSelector(getState())).to.have.length(2);
      expect(s.messagesSelector(getState())[1]).to.have.property('inFlight', false);

      userSelectors.currentUserSelector.restore();
    });
  });

  describe('action: chat/SEND_MESSAGE', () => {
    const testMessage = {
      user: { _id: '643abc235' },
      message: 'Message text',
      parsed: ['Message text'],
    };

    let dateNow;
    beforeEach(() => {
      dateNow = Date.now;
      Date.now = () => 1251669600000;
    });
    afterEach(() => {
      Date.now = dateNow;
    });

    it('should add an in-flight message to the messages list immediately', () => {
      const { dispatch, getState } = createStore();
      sinon.stub(userSelectors, 'currentUserSelector').returns(testMessage.user);

      dispatch(a.sendChat(testMessage.message));
      expect(s.messagesSelector(getState())).to.have.length(1);
      const message = s.messagesSelector(getState())[0];
      expect(message).to.be.an('object');
      expect(message).to.have.property('_id');
      expect(message.userID).to.equal(testMessage.user._id);
      // TODO Call this "text" everywhere
      expect(message.text).to.equal(testMessage.message);
      expect(message.parsedText).to.eql(testMessage.parsed);
      expect(message.timestamp).to.equal(Date.now());
      expect(message.inFlight).to.be.true;

      userSelectors.currentUserSelector.restore();
    });
  });

  describe('issue #179', () => {
    it('logging many messages simultaneously should not drop messages', () => {
      const MESSAGES = 100;
      const { dispatch, getState } = createStore();
      for (let i = 0; i < MESSAGES; i += 1) {
        dispatch(a.log(`Test message ${i}`));
      }
      expect(s.messagesSelector(getState())).to.have.length(MESSAGES);
    });
  });

  describe('Mutes', () => {
    let dispatch;
    let getState;
    const testUsers = [
      { _id: '1', username: 'User One' },
      { _id: '2', username: 'User Two' },
      { _id: '3', username: 'User Three' },
      { _id: '4', username: 'User Four' },
    ];

    beforeEach(() => {
      ({ dispatch, getState } = createStore());
      dispatch(setUsers(testUsers));
    });

    const addTestMute = () => {
      dispatch(a.muteUser('1', {
        moderatorID: '4',
        expires: Date.now() + 3000,
      }));
    };

    it('chat/MUTE_USER should register muted users', () => {
      expect(s.mutedUsersSelector(getState())).to.have.length(0);

      dispatch(a.muteUser('1', {
        moderatorID: '4',
        expires: Date.now() + 3000,
      }));

      expect(s.mutedUsersSelector(getState())).to.eql([testUsers[0]]);
    });

    it('should not process messages received from muted users', () => {
      expect(s.messagesSelector(getState())).to.have.length(0);

      addTestMute();
      dispatch(a.receive({
        _id: 'abc',
        userID: '1',
        text: '*Spam*',
      }));

      expect(s.messagesSelector(getState())).to.have.length(0);
    });

    it('chat/UNMUTE_USERS should remove users from the muted list', () => {
      addTestMute();

      expect(s.mutedUsersSelector(getState())).to.have.length(1);
      dispatch(a.unmuteUser('1', { moderatorID: '3' }));
      expect(s.mutedUsersSelector(getState())).to.have.length(0);

      expect(s.messagesSelector(getState())).to.have.length(0);
      dispatch(a.receive({
        _id: 'abc',
        userID: '1',
        text: '*Spam*',
      }));
      expect(s.messagesSelector(getState())).to.have.length(1);
    });
  });
});
