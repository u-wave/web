import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import MoveToLastIcon from '@material-ui/icons/KeyboardArrowDown';
import { moveMedia } from '../../../actions/PlaylistActionCreators';
import { useMediaListContext } from '../../MediaList/BaseMediaList';
import MediaAction from '../../MediaList/MediaAction';

const {
  useCallback,
} = React;

function MoveToLastAction({ media }) {
  const { playlist, selection } = useMediaListContext();
  const dispatch = useDispatch();
  const handleClick = useCallback(() => {
    const selectedItems = selection.isSelected(media) ? selection.get() : [media];

    dispatch(moveMedia(playlist._id, selectedItems, { at: 'end' }));
  }, [dispatch, playlist, media, selection]);

  return (
    <MediaAction onClick={handleClick}>
      <MoveToLastIcon />
    </MediaAction>
  );
}

MoveToLastAction.propTypes = {
  media: PropTypes.object.isRequired,
};

export default MoveToLastAction;
