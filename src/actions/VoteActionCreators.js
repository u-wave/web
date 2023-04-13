import { put, post } from './RequestActionCreators';
import { historyIDSelector } from '../selectors/boothSelectors';
import {
  FAVORITE, UPVOTE, DOWNVOTE,
  DO_FAVORITE_START, DO_FAVORITE_COMPLETE,
  DO_UPVOTE, DO_DOWNVOTE,
} from '../constants/ActionTypes';
import mergeIncludedModels from '../utils/mergeIncludedModels';
import { flattenPlaylistItem } from './PlaylistActionCreators';

export function favorited({ userID }) {
  return {
    type: FAVORITE,
    payload: { userID },
  };
}

export function receiveVote({ userID, vote: direction }) {
  const type = direction > 0 ? UPVOTE : DOWNVOTE;
  return {
    type,
    payload: { userID },
  };
}

export function vote({ historyID, direction }) {
  const type = direction > 0 ? DO_UPVOTE : DO_DOWNVOTE;
  return put(`/booth/${historyID}/vote`, { direction }, {
    onStart: () => ({
      type,
      payload: { historyID },
    }),
  });
}

export function doUpvote() {
  return (dispatch, getState) => {
    const historyID = historyIDSelector(getState());
    dispatch(vote({ historyID, direction: 1 }));
  };
}

export function doDownvote() {
  return (dispatch, getState) => {
    const historyID = historyIDSelector(getState());
    dispatch(vote({ historyID, direction: -1 }));
  };
}

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
