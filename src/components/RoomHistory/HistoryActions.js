import cx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { addMediaMenu } from '../../actions/PlaylistActionCreators';
import { isLoggedInSelector } from '../../selectors/userSelectors';
import { useMediaListContext } from '../MediaList/BaseMediaList';
import AddToPlaylistAction from '../MediaList/Actions/AddToPlaylist';
import PreviewMediaAction from '../MediaList/PreviewMediaAction';

const {
  useCallback,
} = React;

const dontBubble = (event) => event.stopPropagation();

function HistoryActions({ className, historyEntry }) {
  const { selection } = useMediaListContext();
  const isLoggedIn = useSelector(isLoggedInSelector);

  const dispatch = useDispatch();
  const handleAdd = useCallback((position) => {
    const selectedItems = selection.isSelected(historyEntry) ? selection.get() : [historyEntry];

    dispatch(addMediaMenu(selectedItems.map((entry) => entry.media), position));
  }, [dispatch, selection, historyEntry]);

  if (!isLoggedIn) {
    return null;
  }

  return (
    // eslint-disable-next-line max-len
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div
      className={cx('MediaActions', className)}
      onClick={dontBubble}
    >
      <PreviewMediaAction media={historyEntry.media} />
      <AddToPlaylistAction onAdd={handleAdd} />
    </div>
  );
}

HistoryActions.propTypes = {
  className: PropTypes.string,
  historyEntry: PropTypes.object.isRequired,
};

export default HistoryActions;
