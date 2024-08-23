import { useCallback } from 'react';
import { useSelector, useDispatch } from '../hooks/useRedux';
import {
  close,
  isFavoriteSelector,
  isOpenSelector,
  positionSelector,
  mediaSelector,
  historyIDSelector,
} from '../reducers/addToPlaylistMenu';
import AddToPlaylistMenu from '../components/AddToPlaylistMenu';
import { favorite as favoriteMedia } from '../reducers/booth';
import {
  addPlaylistItems,
  createPlaylist,
  type Playlist,
} from '../reducers/playlists';

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
  const onCreatePlaylist = useCallback(async (name: string) => {
    const result = await dispatch(createPlaylist(name));
    if ('error' in result) {
      throw result.error;
    }
    return result.payload;
  }, [dispatch]);
  const onSelect = useCallback((playlist: Playlist) => {
    if (isFavorite) {
      return dispatch(favoriteMedia({ playlistID: playlist._id, historyID: historyID! }));
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
