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

function MoveToFirstAction({ media }) {
  const { playlist, selection } = useMediaListContext();
  const dispatch = useDispatch();
  const handleClick = useCallback(() => {
    const selectedItems = selection.isSelected(media) ? selection.get() : [media];

    dispatch(moveMedia(playlist._id, selectedItems, { at: 'start' }));
  }, [dispatch, playlist, media, selection]);

  return (
    <MediaAction onClick={handleClick}>
      <SvgIcon>
        <path d="M7.41 15.41 12 10.83l4.59 4.58L18 14l-6-6-6 6z" />
      </SvgIcon>
    </MediaAction>
  );
}

MoveToFirstAction.propTypes = {
  media: PropTypes.object.isRequired,
};

export default MoveToFirstAction;
