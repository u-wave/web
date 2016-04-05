import { post } from '../utils/Request';
import { historyIDSelector } from '../selectors/boothSelectors';
import { playlistsSelector } from '../selectors/playlistSelectors';
import { tokenSelector } from '../selectors/userSelectors';
import { sendVote } from '../utils/Socket';

import { OPEN_ADD_MEDIA_MENU } from '../constants/actionTypes/playlists';
import {
  LOAD_VOTES,
  FAVORITE, UPVOTE, DOWNVOTE,
  DO_FAVORITE_START, DO_FAVORITE_COMPLETE,
  DO_UPVOTE, DO_DOWNVOTE
} from '../constants/actionTypes/votes';

import { addMediaStart, addMediaComplete, flattenPlaylistItem } from './PlaylistActionCreators';

export function setVoteStats(voteStats) {
  return {
    type: LOAD_VOTES,
    payload: voteStats
  };
}

export function favorited({ userID, historyID }) {
  return {
    type: FAVORITE,
    payload: { userID, historyID }
  };
}

export function receiveVote({ userID, vote }) {
  const type = vote > 0 ? UPVOTE : DOWNVOTE;
  return {
    type,
    payload: { userID }
  };
}

export function doUpvote() {
  sendVote(1);
  return { type: DO_UPVOTE };
}

export function doDownvote() {
  sendVote(-1);
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
        type: 'favorite'
      }
    });
  };
}

export function favoriteMediaStart(playlistID, historyID) {
  return {
    type: DO_FAVORITE_START,
    payload: { historyID, playlistID }
  };
}

export function favoriteMediaComplete(playlistID, historyID, changes) {
  return {
    type: DO_FAVORITE_COMPLETE,
    payload: changes,
    meta: { historyID, playlistID }
  };
}

export function favoriteMedia(playlist, historyID) {
  const playlistID = playlist._id;
  return (dispatch, getState) => {
    const jwt = tokenSelector(getState());
    dispatch(favoriteMediaStart(playlistID, historyID));
    dispatch(addMediaStart(playlistID, []));
    post(jwt, `/v1/booth/favorite`, { historyID, playlistID })
      .then(res => res.json())
      .then(changes => {
        dispatch(favoriteMediaComplete(playlistID, historyID, changes));
        dispatch(addMediaComplete(playlistID, changes.playlistSize, {
          afterID: null,
          media: changes.added.map(flattenPlaylistItem)
        }));
      })
      .catch(error => dispatch({
        type: DO_FAVORITE_COMPLETE,
        error: true,
        payload: error,
        meta: { historyID, playlistID }
      }));
  };
}
