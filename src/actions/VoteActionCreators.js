import { post } from '../utils/Request';
import { mediaSelector } from '../selectors/boothSelectors';
import { playlistsSelector } from '../selectors/playlistSelectors';
import { tokenSelector } from '../selectors/userSelectors';
import { sendVote } from '../utils/Socket';

import { OPEN_ADD_MEDIA_MENU } from '../constants/actionTypes/playlists';
import {
  FAVORITE, UPVOTE, DOWNVOTE,
  DO_FAVORITE_START, DO_FAVORITE_COMPLETE,
  DO_UPVOTE, DO_DOWNVOTE
} from '../constants/actionTypes/votes';

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
    const currentMedia = mediaSelector(getState());
    dispatch({
      type: OPEN_ADD_MEDIA_MENU,
      payload: {
        media: [ currentMedia ],
        playlists,
        position
      }
    });
  };
}

export function favoriteMedia(historyID, playlistID) {
  return (dispatch, getState) => {
    const jwt = tokenSelector(getState());
    dispatch({
      type: DO_FAVORITE_START,
      payload: { historyID, playlistID }
    });
    post(jwt, `/v1/booth/favorite`, { historyID, playlistID })
      .then(res => res.json())
      .then(res => dispatch({
        type: DO_FAVORITE_COMPLETE,
        payload: res,
        meta: { historyID, playlistID }
      }))
      .catch(error => dispatch({
        type: DO_FAVORITE_COMPLETE,
        error: true,
        payload: error,
        meta: { historyID, playlistID }
      }));
  };
}
