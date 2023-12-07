import { useCallback } from 'react';
import { mdiPlus } from '@mdi/js';
import { useDispatch } from '../../hooks/useRedux';
import { open as addMediaMenu } from '../../reducers/addToPlaylistMenu';
import MediaAction from '../MediaList/MediaAction';
import SvgIcon from '../SvgIcon';
import type { HistoryEntry } from '../../hooks/useRoomHistory';
import { useRoomHistoryContext } from './context';

type AddToPlaylistActionProps = {
  historyEntry: HistoryEntry,
};

/**
 * This is different from the "standard" <AddToPlaylistAction /> because it deals
 * with history entries instead of media items. History entries _contain_ a media
 * item, but they _are not_ media items, so we need to unwrap them before adding them
 * to a playlist.
 */
function AddToPlaylistAction({ historyEntry }: AddToPlaylistActionProps) {
  const { selection } = useRoomHistoryContext();

  const dispatch = useDispatch();
  const handleClick = useCallback((event: React.MouseEvent) => {
    const selectedItems = selection.isSelected(historyEntry) ? selection.get() as HistoryEntry[] : [historyEntry];
    const rect = event.currentTarget.getBoundingClientRect();

    dispatch(addMediaMenu({
      type: 'add',
      position: { x: rect.left, y: rect.top },
      data: { media: selectedItems.map((entry) => entry.media) },
    }));
  }, [dispatch, selection, historyEntry]);

  return (
    <MediaAction onClick={handleClick}>
      <SvgIcon path={mdiPlus} />
    </MediaAction>
  );
}

export default AddToPlaylistAction;
