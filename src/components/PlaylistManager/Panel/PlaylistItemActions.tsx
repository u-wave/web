import cx from 'clsx';
import AddToPlaylistAction from '../../MediaList/AddToPlaylistAction';
import PreviewMediaAction from '../../MediaList/PreviewMediaAction';
import EditMediaAction from './EditMediaAction';
import MoveToFirstAction from './MoveToFirstAction';
import MoveToLastAction from './MoveToLastAction';
import RemoveFromPlaylistAction from './RemoveFromPlaylistAction';
import type { PlaylistItem } from '../../../reducers/playlists';
import { usePlaylistContext } from './context';

function dontBubble(event: React.MouseEvent<unknown>) {
  event.stopPropagation();
}

type PlaylistItemActionsProps = {
  className?: string,
  index: number,
  media: PlaylistItem,
};
function PlaylistItemActions({ className, index, media }: PlaylistItemActionsProps) {
  const { isFiltered, media: allItems } = usePlaylistContext();
  const isFirst = index === 0;
  const isLast = index === allItems.length - 1;

  return (
    // eslint-disable-next-line max-len
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div className={cx('MediaActions', className)} onClick={dontBubble}>
      <PreviewMediaAction media={media} />
      <AddToPlaylistAction media={media} />
      {/* Don't show the "move to first" action on the first item in the playlist.
        * If the playlist is filtered we don't know if the first item to show is
        * also the first in the playlist, so just show it always in that case. */}
      {(!isFirst || isFiltered) && (
        <MoveToFirstAction media={media} />
      )}
      {(!isLast || isFiltered) && (
        <MoveToLastAction media={media} />
      )}
      <EditMediaAction media={media} />
      <RemoveFromPlaylistAction media={media} />
    </div>
  );
}

export default PlaylistItemActions;
