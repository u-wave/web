import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import MoveToFirstIcon from '@material-ui/icons/KeyboardArrowUp';
import { moveMedia } from '../../../actions/PlaylistActionCreators';
import { useMediaListContext } from '../../MediaList/BaseMediaList';
import MediaAction from '../../MediaList/MediaAction';

const {
  useCallback,
} = React;

function MoveToFirstAction({ media }) {
  const { playlist, selection } = useMediaListContext();
  const dispatch = useDispatch();
  const handleClick = useCallback(() => {
    const selectedItems = selection.isSelected(media) ? selection.get() : [media];

    dispatch(moveMedia(playlist._id, selectedItems, { at: 'start' }));
  }, [dispatch, playlist, media, selection]);

  return (
    <MediaAction onClick={handleClick}>
      <MoveToFirstIcon />
    </MediaAction>
  );
}

MoveToFirstAction.propTypes = {
  media: PropTypes.object.isRequired,
};

export default MoveToFirstAction;
