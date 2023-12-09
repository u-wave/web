import cx from 'clsx';
import AddToPlaylistAction from '../../MediaList/AddToPlaylistAction';
import PreviewMediaAction from '../../MediaList/PreviewMediaAction';
import type { SearchResult } from '../../../containers/SearchResultsPanel';

function dontBubble(event: React.BaseSyntheticEvent) {
  event.stopPropagation();
}

type SearchResultActionsProps = {
  className?: string,
  media: SearchResult,
};
function SearchResultActions({ className, media }: SearchResultActionsProps) {
  return (
    // eslint-disable-next-line max-len
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div
      className={cx('MediaActions', className)}
      onClick={dontBubble}
    >
      <PreviewMediaAction media={media} />
      <AddToPlaylistAction media={media} withCustomMeta={false} />
    </div>
  );
}

export default SearchResultActions;
