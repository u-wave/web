import { useCallback } from 'react';
import { useSelector, useDispatch } from '../hooks/useRedux';
import { favoriteMedia } from '../actions/VoteActionCreators';
import {
  close,
  isFavoriteSelector,
  isOpenSelector,
  positionSelector,
  mediaSelector,
  historyIDSelector,
} from '../reducers/addToPlaylistMenu';
import AddToPlaylistMenu from '../components/AddToPlaylistMenu';
import { addPlaylistItems, createPlaylist, Playlist } from '../reducers/playlists';

function AddToPlaylistMenuContainer() {
  const dispatch = useDispatch();
  const isFavorite = useSelector(isFavoriteSelector);
  const isOpen = useSelector(isOpenSelector);
  const position = useSelector(positionSelector);
  const media = useSelector(mediaSelector);
  const historyID = useSelector(historyIDSelector);

  const onClose = useCallback(() => {
    dispatch(close());
  }, [dispatch]);
  const onCreatePlaylist = useCallback((name: string) => {
    dispatch(createPlaylist(name));
  }, [dispatch]);
  const onSelect = useCallback((playlist: Playlist) => {
    if (isFavorite) {
      return dispatch(favoriteMedia(playlist, historyID!));
    }
    return dispatch(addPlaylistItems({ playlistID: playlist._id, items: media! }));
  }, [dispatch, isFavorite, historyID, media]);

  if (!isOpen) {
    return <span />;
  }

  return (
    <AddToPlaylistMenu
      position={position}
      onClose={onClose}
      onCreatePlaylist={onCreatePlaylist}
      onSelect={onSelect}
    />
  );
}

export default AddToPlaylistMenuContainer;
