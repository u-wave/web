import { useCallback } from 'react';
import { mdiPencil } from '@mdi/js';
import { useDispatch } from '../../../hooks/useRedux';
import SvgIcon from '../../SvgIcon';
import { editMedia } from '../../../actions/PlaylistActionCreators';
import type { PlaylistItem } from '../../../reducers/playlists';
import MediaAction from '../../MediaList/MediaAction';
import { usePlaylistContext } from './context';

type EditMediaActionProps = {
  media: PlaylistItem,
};
function EditMediaAction({ media }: EditMediaActionProps) {
  const { playlist } = usePlaylistContext();
  const dispatch = useDispatch();
  const handleClick = useCallback(() => {
    dispatch(editMedia(playlist._id, media));
  }, [dispatch, playlist, media]);

  return (
    <MediaAction onClick={handleClick}>
      <SvgIcon path={mdiPencil} />
    </MediaAction>
  );
}

export default EditMediaAction;
