import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import DeleteIcon from '@material-ui/icons/Delete';
import { removeMedia } from '../../../actions/PlaylistActionCreators';
import { useMediaListContext } from '../../MediaList/BaseMediaList';
import MediaAction from '../../MediaList/MediaAction';

const {
  useCallback,
} = React;

function RemoveFromPlaylistAction({ media }) {
  const { playlist, selection } = useMediaListContext();
  const dispatch = useDispatch();
  const handleClick = useCallback(() => {
    const selectedItems = selection.isSelected(media) ? selection.get() : [media];

    dispatch(removeMedia(playlist._id, selectedItems));
  }, [dispatch, playlist, media, selection]);

  return (
    <MediaAction onClick={handleClick}>
      <DeleteIcon />
    </MediaAction>
  );
}

RemoveFromPlaylistAction.propTypes = {
  media: PropTypes.object.isRequired,
};

export default RemoveFromPlaylistAction;
