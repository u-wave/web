import { mdiPlus } from '@mdi/js';
import omit from 'just-omit';
import { useCallback } from 'react';
import { useDispatch } from '../../hooks/useRedux';
import { open as addMediaMenu } from '../../reducers/addToPlaylistMenu';
import type { Media } from '../../reducers/booth';
import type { NewPlaylistItem } from '../../reducers/playlists';
import SvgIcon from '../SvgIcon';
import { useMediaListContext } from './BaseMediaList';
import MediaAction from './MediaAction';

function filterNulls<T>(array: (T | null)[]): T[] {
  return array.filter((item) => item != null) as T[];
}

export type AddToPlaylistActionProps = {
  media: Media,
  /**
   * Use the artist/title that is stored on this item.
   * Set to false when dealing with eg. search results, to make the server look up a default
   * artist/title for this media.
   */
  withCustomMeta?: boolean,
};
function AddToPlaylistAction({ media, withCustomMeta = true }: AddToPlaylistActionProps) {
  const { selection } = useMediaListContext();

  const dispatch = useDispatch();
  const handleClick = useCallback((event: React.MouseEvent) => {
    let selectedItems: NewPlaylistItem[] = selection.isSelected(media)
      ? filterNulls(selection.get())
      : [media];
    if (!withCustomMeta) {
      selectedItems = selectedItems.map((item) => omit(item, ['artist', 'title']));
    }
    const rect = event.currentTarget.getBoundingClientRect();

    dispatch(addMediaMenu({
      type: 'add',
      position: { x: rect.left, y: rect.top },
      data: { media: selectedItems },
    }));
  }, [dispatch, selection, media, withCustomMeta]);

  return (
    <MediaAction onClick={handleClick}>
      <SvgIcon path={mdiPlus} />
    </MediaAction>
  );
}

export default AddToPlaylistAction;
