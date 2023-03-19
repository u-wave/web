import omit from 'just-omit';
import { useCallback } from 'react';
import { mdiPlus } from '@mdi/js';
import { useDispatch } from '../../hooks/useRedux';
import { addMediaMenu } from '../../actions/PlaylistActionCreators';
import { useMediaListContext } from './BaseMediaList';
import SvgIcon from '../SvgIcon';
import MediaAction from './MediaAction';
import { Media } from '../../reducers/booth';

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
    let selectedItems = selection.isSelected(media) ? selection.get() : [media];
    if (!withCustomMeta) {
      selectedItems = selectedItems.map((item) => item && omit(item, ['artist', 'title']));
    }
    const rect = event.currentTarget.getBoundingClientRect();

    dispatch(addMediaMenu(selectedItems, {
      x: rect.left,
      y: rect.top,
    }));
  }, [dispatch, selection, media, withCustomMeta]);

  return (
    <MediaAction onClick={handleClick}>
      <SvgIcon path={mdiPlus} />
    </MediaAction>
  );
}

export default AddToPlaylistAction;
