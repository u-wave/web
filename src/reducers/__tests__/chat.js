import expect from 'expect';
import sinon from 'sinon';
import createStore from '../../redux/configureStore';
import { setUsers } from '../../actions/UserActionCreators';
import * as a from '../../actions/ChatActionCreators';
import * as s from '../../selectors/chatSelectors';
import * as userSelectors from '../../selectors/userSelectors';

describe('reducers/chat', () => {
  it('should not respond to unrelated actions', () => {
    const { dispatch, getState } = createStore();
    const initial = s.messagesSelector(getState());
    dispatch({ type: 'randomOtherAction', payload: {} });
    expect(s.messagesSelector(getState())).toEqual(initial);
  });

  it('should default to an empty list of messages', () => {
    const { getState } = createStore();
    expect(s.messagesSelector(getState())).toEqual([]);
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

      expect(s.messagesSelector(getState())).toHaveLength(0);

      dispatch(a.receive(testMessage));

      expect(s.messagesSelector(getState())[0]).toEqual({
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
      expect(s.messagesSelector(getState())).toHaveLength(2);
      expect(s.messagesSelector(getState())[1]).toHaveProperty('inFlight', true);

      // actual test: RECEIVE-ing a sent message should replace that message in
      // the messages list.
      dispatch(a.receive({
        _id: 'a user id-1449941591374',
        userID: inFlightUser._id,
        text: messageText,
        timestamp: 1449941591374,
      }));

      expect(s.messagesSelector(getState())).toHaveLength(2);
      expect(s.messagesSelector(getState())[1]).toHaveProperty('inFlight', false);

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
      expect(s.messagesSelector(getState())).toHaveLength(1);
      const message = s.messagesSelector(getState())[0];
      expect(typeof message).toBe('object');
      expect(message).toHaveProperty('_id');
      expect(message.userID).toBe(testMessage.user._id);
      // TODO Call this "text" everywhere
      expect(message.text).toBe(testMessage.message);
      expect(message.parsedText).toEqual(testMessage.parsed);
      expect(message.timestamp).toBe(Date.now());
      expect(message.inFlight).toBe(true);

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
      expect(s.messagesSelector(getState())).toHaveLength(MESSAGES);
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
      expect(s.mutedUsersSelector(getState())).toHaveLength(0);

      dispatch(a.muteUser('1', {
        moderatorID: '4',
        expires: Date.now() + 3000,
      }));

      expect(s.mutedUsersSelector(getState())).toEqual([testUsers[0]]);
    });

    it('should not process messages received from muted users', () => {
      expect(s.messagesSelector(getState())).toHaveLength(0);

      addTestMute();
      dispatch(a.receive({
        _id: 'abc',
        userID: '1',
        text: '*Spam*',
      }));

      expect(s.messagesSelector(getState())).toHaveLength(0);
    });

    it('chat/UNMUTE_USERS should remove users from the muted list', () => {
      addTestMute();

      expect(s.mutedUsersSelector(getState())).toHaveLength(1);
      dispatch(a.unmuteUser('1', { moderatorID: '3' }));
      expect(s.mutedUsersSelector(getState())).toHaveLength(0);

      expect(s.messagesSelector(getState())).toHaveLength(0);
      dispatch(a.receive({
        _id: 'abc',
        userID: '1',
        text: '*Spam*',
      }));
      expect(s.messagesSelector(getState())).toHaveLength(1);
    });
  });
});
