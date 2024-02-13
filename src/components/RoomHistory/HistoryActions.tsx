import cx from 'clsx';
import { useSelector } from '../../hooks/useRedux';
import { isLoggedInSelector } from '../../reducers/auth';
import PreviewMediaAction from '../MediaList/PreviewMediaAction';
import AddToPlaylistAction from './AddToPlaylistAction';
import type { HistoryEntry } from '../../hooks/useRoomHistory';

const dontBubble = (event: React.MouseEvent) => event.stopPropagation();

type HistoryActionsProps = {
  className?: string,
  historyEntry: HistoryEntry,
};
function HistoryActions({ className, historyEntry }: HistoryActionsProps) {
  const isLoggedIn = useSelector(isLoggedInSelector);

  return (
    // eslint-disable-next-line max-len
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div
      className={cx('MediaActions', className)}
      onClick={dontBubble}
    >
      <PreviewMediaAction media={historyEntry.media} />
      {isLoggedIn && <AddToPlaylistAction historyEntry={historyEntry} />}
    </div>
  );
}

export default HistoryActions;
