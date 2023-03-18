import omit from 'just-omit';
import { AnyAction } from 'redux';
import { v4 as randomUUID } from 'uuid';
import {
  INIT_STATE,
  RECEIVE_MOTD,
  RECEIVE_MESSAGE,
  SEND_MESSAGE,
  LOG,
  REMOVE_MESSAGE,
  REMOVE_USER_MESSAGES,
  REMOVE_ALL_MESSAGES,
  MUTE_USER,
  UNMUTE_USER,
  ADVANCE,
  BOOTH_SKIP,
  USER_JOIN,
  USER_LEAVE,
  CHANGE_USERNAME,
  USER_ADD_ROLES,
  USER_REMOVE_ROLES,
} from '../constants/ActionTypes';
import type { User } from './users';
import { MarkupNode } from 'u-wave-parse-chat-markup';

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
    expiresAt: string,
    expirationTimer: ReturnType<typeof setTimeout> | null,
  }>;
}

const initialState: State = {
  motd: null,
  messages: [],
  mutedUsers: {},
};

function removeInFlightMessage(messages: Message[], remove: ChatMessage) {
  return messages.filter((message) => (
    message.type !== 'chat'
    // keep if this message is not in flight
    || !message.inFlight
    // or is not the message we're looking for
    || message.userID !== remove.userID
    || message.text !== remove.text
  ));
}

export default function reduce(state = initialState, action: AnyAction) {
  const { type, payload } = action;
  const { messages } = state;
  switch (type) {
    case INIT_STATE:
      return {
        ...state,
        motd: payload.motd,
      };
    case RECEIVE_MOTD:
      return {
        ...state,
        motd: payload,
      };
    case SEND_MESSAGE: {
      const inFlightMessage = {
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
      };
      return {
        ...state,
        messages: [...messages, inFlightMessage],
      };
    }
    case RECEIVE_MESSAGE: {
      const message = {
        ...payload.message,
        type: 'chat',
        inFlight: false,
        parsedText: payload.parsed,
        isMention: payload.isMention,
      };

      return {
        ...state,
        messages: removeInFlightMessage(messages, message).concat([message]),
      };
    }
    case LOG: {
      const logMessage = {
        type: 'log',
        _id: payload._id,
        text: payload.text,
      };
      return {
        ...state,
        messages: [...messages, logMessage],
      };
    }

    case REMOVE_MESSAGE:
      return {
        ...state,
        messages: state.messages.filter((msg) => msg._id !== payload._id),
      };
    case REMOVE_USER_MESSAGES:
      return {
        ...state,
        messages: state.messages.filter((msg) => msg.type !== 'chat' || msg.userID !== payload.userID),
      };
    case REMOVE_ALL_MESSAGES:
      return {
        ...state,
        messages: [],
      };

    case MUTE_USER:
      return {
        ...state,
        mutedUsers: {
          ...state.mutedUsers,
          [payload.userID]: {
            mutedBy: payload.moderatorID,
            expiresAt: payload.expiresAt,
            expirationTimer: payload.expirationTimer,
          },
        },
      };
    case UNMUTE_USER:
      return {
        ...state,
        mutedUsers: omit(state.mutedUsers, payload.userID),
      };

    case USER_JOIN:
      return {
        ...state,
        messages: state.messages.concat([{
          type: 'userJoin',
          _id: randomUUID(),
          user: payload.user,
          timestamp: payload.timestamp,
        }]),
      };
    case USER_LEAVE:
      return {
        ...state,
        messages: state.messages.concat([{
          type: 'userLeave',
          _id: randomUUID(),
          user: payload.user,
          timestamp: payload.timestamp,
        }]),
      };
    case CHANGE_USERNAME:
      return {
        ...state,
        messages: state.messages.concat([{
          type: 'userNameChanged',
          _id: randomUUID(),
          user: payload.user,
          newUsername: payload.username,
          timestamp: payload.timestamp,
        }]),
      };
    case USER_ADD_ROLES: // fall through
    case USER_REMOVE_ROLES:
      return {
        ...state,
        messages: state.messages.concat([{
          type: 'roleUpdate',
          _id: randomUUID(),
          user: payload.user,
          updateType: type === USER_ADD_ROLES ? 'add' : 'remove',
          roles: payload.roles,
          timestamp: payload.timestamp,
        }]),
      };
    case ADVANCE: {
      if (payload === null) {
        return state;
      }

      return {
        ...state,
        messages: state.messages.concat([{
          type: 'nowPlaying',
          _id: randomUUID(),
          entry: payload.media,
          timestamp: payload.timestamp,
        }]),
      };
    }
    case BOOTH_SKIP:
      return {
        ...state,
        messages: state.messages.concat([{
          type: 'skip',
          _id: randomUUID(),
          user: payload.user,
          moderator: payload.moderator,
          reason: payload.reason,
          timestamp: payload.timestamp,
        }]),
      };

    default:
      return state;
  }
}
