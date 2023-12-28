import cx from 'clsx';
import PropTypes from 'prop-types';
import { useSelector } from '../../hooks/useRedux';
import { isLoggedInSelector } from '../../reducers/auth';
import PreviewMediaAction from '../MediaList/PreviewMediaAction';
import AddToPlaylistAction from './AddToPlaylistAction';

const dontBubble = (event) => event.stopPropagation();

function HistoryActions({ className, historyEntry }) {
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

HistoryActions.propTypes = {
  className: PropTypes.string,
  historyEntry: PropTypes.object.isRequired,
};

export default HistoryActions;
