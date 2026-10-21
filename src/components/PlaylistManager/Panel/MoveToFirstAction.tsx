import { mdiChevronUp } from '@mdi/js';
import { useCallback } from 'react';
import { useDispatch } from '../../../hooks/useRedux';
import { movePlaylistItems, type PlaylistItem } from '../../../reducers/playlists';
import MediaAction from '../../MediaList/MediaAction';
import SvgIcon from '../../SvgIcon';
import { usePlaylistContext } from './context';

type MoveToFirstActionProps = {
  media: PlaylistItem,
};
function MoveToFirstAction({ media }: MoveToFirstActionProps) {
  const { playlist, selection } = usePlaylistContext();
  const dispatch = useDispatch();
  const handleClick = useCallback(() => {
    const selectedItems = selection.isSelected(media) ? selection.get() : [media];

    dispatch(movePlaylistItems({
      playlistID: playlist._id,
      // If an item is not loaded, you would not be able to select it
      medias: selectedItems as PlaylistItem[],
      target: { at: 'start' },
    }));
  }, [dispatch, playlist, media, selection]);

  return (
    <MediaAction onClick={handleClick}>
      <SvgIcon path={mdiChevronUp} />
    </MediaAction>
  );
}

export default MoveToFirstAction;
