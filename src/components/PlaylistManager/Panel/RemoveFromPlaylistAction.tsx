import { useCallback } from 'react';
import { mdiDelete } from '@mdi/js';
import { useDispatch } from '../../../hooks/useRedux';
import SvgIcon from '../../SvgIcon';
import MediaAction from '../../MediaList/MediaAction';
import { type PlaylistItem, removePlaylistItems } from '../../../reducers/playlists';
import { usePlaylistContext } from './context';

type RemoveFromPlaylistActionProps = {
  media: PlaylistItem,
};
function RemoveFromPlaylistAction({ media }: RemoveFromPlaylistActionProps) {
  const { playlist, selection } = usePlaylistContext();
  const playlistID = playlist._id;
  const dispatch = useDispatch();
  const handleClick = useCallback(() => {
    const selectedItems = selection.isSelected(media) ? selection.get() : [media];

    dispatch(removePlaylistItems({
      playlistID,
      medias: selectedItems as PlaylistItem[],
    }));
  }, [dispatch, playlistID, media, selection]);

  return (
    <MediaAction onClick={handleClick}>
      <SvgIcon path={mdiDelete} />
    </MediaAction>
  );
}

export default RemoveFromPlaylistAction;
