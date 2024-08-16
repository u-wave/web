import mapValues from 'just-map-values';
import { v4 as randomUUID } from 'uuid';
import parseChatMarkup, { type MarkupNode } from 'u-wave-parse-chat-markup';
import { type PayloadAction, createSlice, createSelector } from '@reduxjs/toolkit';
import {
  type User,
  actions as userActions,
  usersSelector,
  currentUserSelector,
} from './users';
import { advanceInner } from './booth';
import { initState } from './auth';
import { createAsyncThunk } from '../redux/api';
import uwFetch from '../utils/fetch';
import type { StoreState } from '../redux/configureStore';
import { type NotificationSettings, notificationSettingsSelector } from './settings';

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
    _id: string,
    sourceType: string,
    sourceID: string,
    thumbnail: string,
    duration: number,
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
  moderator?: User | undefined,
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
    userMuted(state, { payload }: PayloadAction<{
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
    userUnmuted(state, { payload }: PayloadAction<{ userID: string, moderatorID?: string }>) {
      const muted = state.mutedUsers[payload.userID];
      if (muted?.expirationTimer) {
        clearTimeout(muted.expirationTimer);
      }
      delete state.mutedUsers[payload.userID];
    },
    receiveSkip(state, action: PayloadAction<{
      user: User,
      moderator?: User | undefined,
      reason: string,
      timestamp: number,
    }>) {
      state.messages.push({
        type: 'skip',
        _id: randomUUID(),
        user: action.payload.user,
        moderator: action.payload.moderator,
        reason: action.payload.reason,
        timestamp: action.payload.timestamp,
      });
    },
  },
  extraReducers(builder) {
    builder
      .addCase(initState.fulfilled, (state, action) => {
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
      .addCase(advanceInner, (state, action) => {
        if (action.payload === null) {
          return;
        }

        state.messages.push({
          type: 'nowPlaying',
          _id: randomUUID(),
          entry: action.payload.media,
          timestamp: action.payload.timestamp,
        });
      });
  },
  selectors: {
    motdSource: (state) => state.motd,
    mutes: (state) => state.mutedUsers,
    mutedUser: (state, userID: string) => {
      if (Object.hasOwn(state.mutedUsers, userID)) {
        return state.mutedUsers[userID]!;
      }
      return null;
    },
  },
});

export const {
  sendMessage,
  receiveMessage,
  log,
  deleteMessageByID,
  deleteMessagesByUser,
  deleteAllMessages,
  userMuted,
  userUnmuted,
  receiveSkip,
} = slice.actions;

export const {
  motdSource: motdSourceSelector,
  mutedUser: mutedUserSelector,
} = slice.selectors;
export const motdSelector = createSelector([slice.selectors.motdSource], (source) => {
  return source ? parseChatMarkup(source) : null;
});

const MAX_MESSAGES = 500;
const allMessagesSelector = (state: StoreState) => state.chat.messages;
// Hide notifications that are disabled.
function applyNotificationSettings(
  messages: Message[],
  notificationSettings: NotificationSettings,
) {
  return messages.filter((message) => {
    if (message.type === 'userJoin') return notificationSettings.userJoin;
    if (message.type === 'userLeave') return notificationSettings.userLeave;
    if (message.type === 'userNameChanged') return notificationSettings.userNameChanged;
    if (message.type === 'skip') return notificationSettings.skip;
    return true;
  });
}
// Only show the most recent now playing notification.
function collapseNowPlayingNotifications(messages: Message[]) {
  return messages.filter((message, i) => {
    if (message.type !== 'nowPlaying') return true;
    const nextMessage = messages[i + 1];
    return nextMessage && nextMessage.type !== 'nowPlaying';
  });
}
const filteredMessagesSelector = createSelector(
  [allMessagesSelector, notificationSettingsSelector],
  (messages, notificationSettings) => collapseNowPlayingNotifications(
    applyNotificationSettings(messages, notificationSettings),
  ),
);
export const messagesSelector = createSelector(
  [filteredMessagesSelector],
  (messages) => messages.slice(-MAX_MESSAGES),
);

export const muteTimeoutsSelector = createSelector(
  [slice.selectors.mutes],
  (mutes) => mapValues(mutes, (mute) => mute.expirationTimer),
);

export const mutedUserIDsSelector = createSelector(
  [slice.selectors.mutes],
  (mutes) => Object.keys(mutes),
);

export const mutedUsersSelector = createSelector(
  [mutedUserIDsSelector, usersSelector],
  (mutedIDs, users) => mutedIDs.map((userID) => users[userID]),
);

export const currentUserMuteSelector = (state: StoreState) => {
  const user = currentUserSelector(state);
  const mutes = slice.selectors.mutes(state);
  return user ? mutes[user._id] : null;
};

export const setMotd = createAsyncThunk('chat/setMotd', async (text: string | null, api) => {
  const { data } = await uwFetch<{
    data: { motd: string },
  }>(['/motd', {
    method: 'put',
    data: { motd: text },
  }]);

  if (data.motd == null) {
    api.dispatch(log('Message of the Day cleared'));
  } else {
    api.dispatch(log(`Message of the Day is now: ${data.motd}`));
  }
});

export const deleteChatMessage = createAsyncThunk('chat/deleteMessage', async (id: string) => {
  await uwFetch([`/chat/${id}`, { method: 'delete' }]);
});

export const deleteChatMessagesByUser = createAsyncThunk('chat/deleteMessage', async (userID: string) => {
  await uwFetch([`/chat/user/${userID}`, { method: 'delete' }]);
});

export const deleteAllChatMessages = createAsyncThunk('chat/deleteMessage', async () => {
  await uwFetch(['/chat', { method: 'delete' }]);
});

export const muteUser = createAsyncThunk('chat/muteUser', async (param: { userID: string, duration?: number }) => {
  const time = param.duration ?? 600_000; // 10 minutes
  await uwFetch([`/users/${param.userID}/mute`, {
    method: 'post',
    data: { time },
  }]);
});

export const unmuteUser = createAsyncThunk('chat/muteUser', async (param: { userID: string }) => {
  await uwFetch([`/users/${param.userID}/mute`, {
    method: 'delete',
  }]);
});

export default slice.reducer;
