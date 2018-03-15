import { IDLE, LOADING, LOADED } from '../../constants/LoadingStates';

import {
  PLAYLIST,
  CHANNEL,
  GET_IMPORTABLE_PLAYLIST_START,
  GET_IMPORTABLE_PLAYLIST_COMPLETE,
  GET_CHANNEL_PLAYLISTS_START,
  GET_CHANNEL_PLAYLISTS_COMPLETE,
} from './constants';

const initialState = {
  type: null,
  importingState: IDLE,
  importingPlaylistName: '',
  importingPlaylistItems: [],
  importingChannelTitle: '',
  importablePlaylists: [],
};

export default function reduce(state = initialState, action = {}) {
  const { type, error, payload } = action;
  switch (type) {
    case GET_IMPORTABLE_PLAYLIST_START:
      return {
        ...state,
        type: PLAYLIST,
        importingState: LOADING,
      };
    case GET_IMPORTABLE_PLAYLIST_COMPLETE:
      if (error) {
        return {
          ...state,
          type: null,
          importingState: IDLE,
        };
      }

      return {
        ...state,
        importingState: LOADED,
        importingPlaylist: payload.playlist,
        importingPlaylistItems: payload.items,
      };
    case GET_CHANNEL_PLAYLISTS_START:
      return {
        ...state,
        type: CHANNEL,
        importingState: LOADING,
      };
    case GET_CHANNEL_PLAYLISTS_COMPLETE:
      if (error) {
        return {
          ...state,
          type: null,
          importingState: IDLE,
        };
      }

      return {
        ...state,
        importingState: LOADED,
        importingChannelTitle: payload.channel.title,
        importablePlaylists: payload.playlists,
      };
    default:
      return state;
  }
}
