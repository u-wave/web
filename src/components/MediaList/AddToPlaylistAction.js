import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import AddIcon from '@material-ui/icons/Add';
import { addMediaMenu } from '../../actions/PlaylistActionCreators';
import { useMediaListContext } from './BaseMediaList';
import MediaAction from './MediaAction';

const {
  useCallback,
} = React;

function AddToPlaylistAction({ media }) {
  const { selection } = useMediaListContext();

  const dispatch = useDispatch();
  const handleClick = useCallback((event) => {
    const selectedItems = selection.isSelected(media) ? selection.get() : [media];
    const rect = event.target.getBoundingClientRect();

    dispatch(addMediaMenu(selectedItems, {
      x: rect.left,
      y: rect.top,
    }));
  }, [dispatch, selection, media]);

  return (
    <MediaAction onClick={handleClick}>
      <AddIcon />
    </MediaAction>
  );
}

AddToPlaylistAction.propTypes = {
  media: PropTypes.object.isRequired,
};

export default AddToPlaylistAction;
