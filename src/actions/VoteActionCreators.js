import { post } from './RequestActionCreators';
import { historyIDSelector } from '../selectors/boothSelectors';
import { playlistsSelector } from '../selectors/playlistSelectors';
import {
  OPEN_ADD_MEDIA_MENU,
  LOAD_VOTES,
  FAVORITE, UPVOTE, DOWNVOTE,
  DO_FAVORITE_START, DO_FAVORITE_COMPLETE,
  DO_UPVOTE, DO_DOWNVOTE,
} from '../constants/ActionTypes';
import mergeIncludedModels from '../utils/mergeIncludedModels';
import { flattenPlaylistItem } from './PlaylistActionCreators';

export function setVoteStats(voteStats) {
  return {
    type: LOAD_VOTES,
    payload: voteStats,
  };
}

export function favorited({ userID, historyID }) {
  return {
    type: FAVORITE,
    payload: { userID, historyID },
  };
}

export function receiveVote({ userID, vote }) {
  const type = vote > 0 ? UPVOTE : DOWNVOTE;
  return {
    type,
    payload: { userID },
  };
}

export function doUpvote() {
  return { type: DO_UPVOTE };
}

export function doDownvote() {
  return { type: DO_DOWNVOTE };
}

export function openFavoriteMenu(position) {
  return (dispatch, getState) => {
    const playlists = playlistsSelector(getState());
    const historyID = historyIDSelector(getState());
    dispatch({
      type: OPEN_ADD_MEDIA_MENU,
      payload: { historyID },
      meta: {
        playlists,
        position,
        type: 'favorite',
      },
    });
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
    onComplete: res => favoriteMediaComplete(playlistID, historyID, {
      added: mergeIncludedModels(res),
      playlistSize: res.meta.playlistSize,
    }),
    onError: error => ({
      type: DO_FAVORITE_COMPLETE,
      error: true,
      payload: error,
      meta: { historyID, playlistID },
    }),
  });
}
