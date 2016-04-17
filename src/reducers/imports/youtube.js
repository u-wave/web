import { IDLE, LOADING, LOADED } from '../../constants/LoadingStates';

const PLAYLIST = 'youtube/import/PLAYLIST';
const CHANNEL = 'youtube/import/CHANNEL';

const GET_IMPORTABLE_PLAYLIST_START = 'youtube/import/GET_IMPORTABLE_PLAYLIST_START';
const GET_IMPORTABLE_PLAYLIST_COMPLETE = 'youtube/import/GET_IMPORTABLE_PLAYLIST_COMPLETE';

const GET_CHANNEL_PLAYLISTS_START = 'youtube/import/GET_CHANNEL_PLAYLISTS_START';
const GET_CHANNEL_PLAYLISTS_COMPLETE = 'youtube/import/GET_CHANNEL_PLAYLISTS_COMPLETE';

const initialState = {
  type: null,
  importingState: IDLE,
  importingPlaylistName: '',
  importingPlaylistItems: [],
  importingChannelTitle: '',
  importablePlaylists: []
};

export default function reduce(state = initialState, action = {}) {
  const { type, error, payload } = action;
  switch (type) {
  case GET_IMPORTABLE_PLAYLIST_START:
    return {
      ...state,
      type: PLAYLIST,
      importingState: LOADING
    };
  case GET_IMPORTABLE_PLAYLIST_COMPLETE:
    if (error) {
      return {
        ...state,
        type: null,
        importingState: IDLE
      };
    }

    return {
      ...state,
      importingState: LOADED,
      importingPlaylist: payload.playlist,
      importingPlaylistItems: payload.items
    };
  case GET_CHANNEL_PLAYLISTS_START:
    return {
      ...state,
      type: CHANNEL,
      importingState: LOADING
    };
  case GET_CHANNEL_PLAYLISTS_COMPLETE:
    if (error) {
      return {
        ...state,
        type: null,
        importingState: IDLE
      };
    }

    return {
      ...state,
      importingState: LOADED,
      importingChannelTitle: payload.channel.title,
      importablePlaylists: payload.playlists
    };
  default:
    return state;
  }
}
