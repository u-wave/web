import { AnyAction } from 'redux';
import { v4 as randomUUID } from 'uuid';
import { MarkupNode } from 'u-wave-parse-chat-markup';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { INIT_STATE, BOOTH_SKIP } from '../constants/ActionTypes';
import { type User, actions as userActions } from './users';
import { advance } from './booth';

export interface ChatMessage {
  _id: string;
  type: 'chat';
  user: User;
  userID: string;
  text: string;
  parsedText?: MarkupNode[];
  timestamp: number;
  inFlight: boolean;
  isMention: boolean;
}

export interface LogMessage {
  type: 'log';
  _id: string;
  text: string;
}

export interface UserJoinMessage {
  type: 'userJoin',
  _id: string,
  user: User,
  timestamp: number,
}

export interface UserLeaveMessage {
  type: 'userLeave',
  _id: string,
  user: User,
  timestamp: number,
}

export interface UserNameChangedMessage {
  type: 'userNameChanged',
  _id: string,
  user: User,
  newUsername: string,
  timestamp: number,
}

export interface RoleUpdateMessage {
  type: 'roleUpdate',
  _id: string,
  user: User,
  updateType: 'add' | 'remove',
  roles: string[],
  timestamp: number,
}

export interface NowPlayingMessage {
  type: 'nowPlaying',
  _id: string,
  entry: {
    media: {
      _id: string,
      sourceType: string,
      sourceID: string,
      thumbnail: string,
      duration: number,
    },
    artist: string,
    title: string,
    start: number,
    end: number,
  },
  timestamp: number,
}

export interface SkipMessage {
  type: 'skip',
  _id: string,
  user: User,
  moderator: User,
  reason: string,
  timestamp: number,
}

export type Message =
  | ChatMessage
  | LogMessage
  | UserJoinMessage
  | UserLeaveMessage
  | UserNameChangedMessage
  | RoleUpdateMessage
  | NowPlayingMessage
  | SkipMessage;

interface State {
  /**
   * Message of the Day, a message shown at the very top of the Chat box. Can be
   * used for announcements, for example, or a welcome message.
   */
  motd: string | null;
  /**
   * All messages, including log messages and in-flight messages.
   */
  messages: Message[],
  /**
   * Mutes and their expiration times.
   */
  mutedUsers: Record<string, {
    mutedBy: string,
    expiresAt: number,
    expirationTimer: ReturnType<typeof setTimeout> | null,
  }>;
}

const initialState = {
  motd: null,
  messages: [],
  mutedUsers: {},
} as State;

const slice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    sendMessage(state, { payload }: PayloadAction<{
      user: User,
      message: string,
      parsed: MarkupNode[],
    }>) {
      state.messages.push({
        _id: randomUUID(),
        type: 'chat',
        user: payload.user,
        userID: payload.user._id,
        text: payload.message,
        parsedText: payload.parsed,
        timestamp: Date.now(),
        inFlight: true,
        // Will be resolved when the message is received instead.
        isMention: false,
      });
    },
    receiveMessage(state, action: PayloadAction<{
      message: {
        _id: string,
        user: User,
        userID: string,
        text: string,
        timestamp: number,
      },
      isMention: boolean,
      parsed: MarkupNode[],
    }>) {
      const index = state.messages.findIndex((message) => {
        return message.type === 'chat'
          && message.inFlight
          // or is not the message we're looking for
          && message.userID === action.payload.message.userID
          && message.text === action.payload.message.text;
      });
      if (index !== -1) {
        state.messages.splice(index, 1);
      }

      state.messages.push({
        ...action.payload.message,
        type: 'chat',
        inFlight: false,
        parsedText: action.payload.parsed,
        isMention: action.payload.isMention,
      });
    },
    log: {
      reducer(state, { payload }: PayloadAction<{ _id: string, text: string }>) {
        state.messages.push({
          type: 'log',
          _id: payload._id,
          text: payload.text,
        });
      },
      prepare(text: string) {
        return {
          payload: {
            _id: randomUUID(),
            text,
          },
        };
      },
    },
    deleteMessageByID(state, { payload }: PayloadAction<{ _id: string }>) {
      const index = state.messages.findIndex((message) => message._id === payload._id);
      if (index !== -1) {
        state.messages.splice(index, 1);
      }
    },
    deleteMessagesByUser(state, { payload }: PayloadAction<{ userID: string }>) {
      state.messages = state.messages.filter((message) => message.type !== 'chat' || message.userID !== payload.userID);
    },
    deleteAllMessages(state) {
      state.messages = [];
    },
    muteUser(state, { payload }: PayloadAction<{
      moderatorID: string,
      userID: string,
      expiresAt: number,
      expirationTimer: null | ReturnType<typeof setTimeout>,
    }>) {
      state.mutedUsers[payload.userID] = {
        mutedBy: payload.moderatorID,
        expiresAt: payload.expiresAt,
        expirationTimer: payload.expirationTimer,
      };
    },
    unmuteUser(state, { payload }: PayloadAction<{ userID: string, moderatorID?: string }>) {
      const muted = state.mutedUsers[payload.userID];
      if (muted?.expirationTimer) {
        clearTimeout(muted.expirationTimer);
      }
      delete state.mutedUsers[payload.userID];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(INIT_STATE, (state, action: AnyAction) => {
        state.motd = action.payload.motd;
      })
      .addCase(userActions.userJoin, (state, action) => {
        state.messages.push({
          type: 'userJoin',
          _id: randomUUID(),
          user: action.payload.user,
          timestamp: Date.now(),
        });
      })
      .addCase(userActions.userLeave, (state, action) => {
        state.messages.push({
          type: 'userLeave',
          _id: randomUUID(),
          user: action.payload.user,
          timestamp: Date.now(),
        });
      })
      .addCase(userActions.usernameChanged, (state, action) => {
        state.messages.push({
          type: 'userNameChanged',
          _id: randomUUID(),
          user: action.payload.user,
          newUsername: action.payload.username,
          timestamp: Date.now(),
        });
      })
      .addCase(userActions.addRoles, (state, action) => {
        state.messages.push({
          type: 'roleUpdate',
          _id: randomUUID(),
          user: action.payload.user,
          updateType: 'add',
          roles: action.payload.roles,
          timestamp: Date.now(),
        });
      })
      .addCase(userActions.removeRoles, (state, action) => {
        state.messages.push({
          type: 'roleUpdate',
          _id: randomUUID(),
          user: action.payload.user,
          updateType: 'remove',
          roles: action.payload.roles,
          timestamp: Date.now(),
        });
      })
      .addCase(advance, (state, action) => {
        if (action.payload === null) {
          return;
        }

        state.messages.push({
          type: 'nowPlaying',
          _id: randomUUID(),
          entry: action.payload.media,
          timestamp: action.payload.timestamp,
        });
      })
      .addCase(BOOTH_SKIP, (state, action: AnyAction) => {
        state.messages.push({
          type: 'skip',
          _id: randomUUID(),
          user: action.payload.user,
          moderator: action.payload.moderator,
          reason: action.payload.reason,
          timestamp: action.payload.timestamp,
        });
      });
  },
});

export const {
  sendMessage,
  receiveMessage,
  log,
  deleteMessageByID,
  deleteMessagesByUser,
  deleteAllMessages,
  muteUser,
  unmuteUser,
} = slice.actions;

export default slice.reducer;
