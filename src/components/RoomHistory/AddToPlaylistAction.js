import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import AddIcon from '@material-ui/icons/Add';
import { addMediaMenu } from '../../actions/PlaylistActionCreators';
import { useMediaListContext } from '../MediaList/BaseMediaList';
import MediaAction from '../MediaList/MediaAction';

const {
  useCallback,
} = React;

/**
 * This is different from the "standard" <AddToPlaylistAction /> because it deals
 * with history entries instead of media items. History entries _contain_ a media
 * item, but they _are not_ media items, so we need to unwrap them before adding them
 * to a playlist.
 */
function AddToPlaylistAction({ historyEntry }) {
  const { selection } = useMediaListContext();

  const dispatch = useDispatch();
  const handleClick = useCallback((event) => {
    const selectedItems = selection.isSelected(historyEntry) ? selection.get() : [historyEntry];
    const rect = event.target.getBoundingClientRect();

    dispatch(addMediaMenu(selectedItems.map((entry) => entry.media), {
      x: rect.left,
      y: rect.top,
    }));
  }, [dispatch, selection, historyEntry]);

  return (
    <MediaAction onClick={handleClick}>
      <AddIcon />
    </MediaAction>
  );
}

AddToPlaylistAction.propTypes = {
  historyEntry: PropTypes.object.isRequired,
};

export default AddToPlaylistAction;
