import { mdiPencil } from '@mdi/js';
import { useCallback } from 'react';
import { useDispatch } from '../../../hooks/useRedux';
import { openEditMediaDialog } from '../../../reducers/dialogs';
import type { PlaylistItem } from '../../../reducers/playlists';
import MediaAction from '../../MediaList/MediaAction';
import SvgIcon from '../../SvgIcon';
import { usePlaylistContext } from './context';

type EditMediaActionProps = {
  media: PlaylistItem,
};
function EditMediaAction({ media }: EditMediaActionProps) {
  const { playlist } = usePlaylistContext();
  const playlistID = playlist._id;
  const dispatch = useDispatch();
  const handleClick = useCallback(() => {
    dispatch(openEditMediaDialog({ playlistID, media }));
  }, [dispatch, playlistID, media]);

  return (
    <MediaAction onClick={handleClick}>
      <SvgIcon path={mdiPencil} />
    </MediaAction>
  );
}

export default EditMediaAction;
