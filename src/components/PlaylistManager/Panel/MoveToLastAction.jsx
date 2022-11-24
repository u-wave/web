import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { moveMedia } from '../../../actions/PlaylistActionCreators';
import { useMediaListContext } from '../../MediaList/BaseMediaList';
import SvgIcon from '../../SvgIcon';
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
      <SvgIcon>
        <path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
      </SvgIcon>
    </MediaAction>
  );
}

MoveToLastAction.propTypes = {
  media: PropTypes.object.isRequired,
};

export default MoveToLastAction;
