import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  createPlaylist,
  addMedia,
  closeAddMediaMenu,
} from '../actions/PlaylistActionCreators';
import { favoriteMedia } from '../actions/VoteActionCreators';
import {
  isFavoriteSelector,
  isOpenSelector,
  positionSelector,
  mediaSelector,
  historyIDSelector,
} from '../selectors/addToPlaylistMenuSelectors';
import { playlistsSelector } from '../selectors/playlistSelectors';
import AddToPlaylistMenu from '../components/AddToPlaylistMenu';

const { useCallback } = React;

function AddToPlaylistMenuContainer() {
  const dispatch = useDispatch();
  const isFavorite = useSelector(isFavoriteSelector);
  const isOpen = useSelector(isOpenSelector);
  const position = useSelector(positionSelector);
  const playlists = useSelector(playlistsSelector);
  const media = useSelector(mediaSelector);
  const historyID = useSelector(historyIDSelector);

  const onClose = useCallback(() => dispatch(closeAddMediaMenu()), [dispatch]);
  const onCreatePlaylist = useCallback((name) => dispatch(createPlaylist(name)), [dispatch]);
  const onSelect = useCallback((playlist) => {
    if (isFavorite) {
      return dispatch(favoriteMedia(playlist, historyID));
    }
    return dispatch(addMedia(playlist, media));
  }, [dispatch, isFavorite, historyID, media]);

  if (!isOpen) {
    return <span />;
  }

  return (
    <AddToPlaylistMenu
      open={isOpen}
      position={position}
      playlists={playlists}
      onClose={onClose}
      onCreatePlaylist={onCreatePlaylist}
      onSelect={onSelect}
    />
  );
}

export default AddToPlaylistMenuContainer;
