import { post } from './RequestActionCreators';
import { DO_FAVORITE_START, DO_FAVORITE_COMPLETE } from '../constants/ActionTypes';
import mergeIncludedModels from '../utils/mergeIncludedModels';
import { flattenPlaylistItem } from './PlaylistActionCreators';

export function favoriteMediaStart(playlistID, historyID) {
  return {
    type: DO_FAVORITE_START,
    payload: { historyID, playlistID },
  };
}

export function favoriteMediaComplete(playlistID, historyID, changes) {
  return {
    type: DO_FAVORITE_COMPLETE,
    payload: {
      historyID,
      playlistID,
      added: changes.added.map(flattenPlaylistItem),
      newSize: changes.playlistSize,
    },
  };
}

export function favoriteMedia(playlist, historyID) {
  const playlistID = playlist._id;
  return post('/booth/favorite', { historyID, playlistID }, {
    onStart: () => favoriteMediaStart(playlistID, historyID),
    onComplete: (res) => favoriteMediaComplete(playlistID, historyID, {
      added: mergeIncludedModels(res),
      playlistSize: res.meta.playlistSize,
    }),
    onError: (error) => ({
      type: DO_FAVORITE_COMPLETE,
      error: true,
      payload: error,
      meta: { historyID, playlistID },
    }),
  });
}
