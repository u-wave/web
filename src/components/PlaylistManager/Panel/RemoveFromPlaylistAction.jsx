import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { removeMedia } from '../../../actions/PlaylistActionCreators';
import { useMediaListContext } from '../../MediaList/BaseMediaList';
import SvgIcon from '../../SvgIcon';
import MediaAction from '../../MediaList/MediaAction';

const {
  useCallback,
} = React;

function RemoveFromPlaylistAction({ media }) {
  const { playlist, selection } = useMediaListContext();
  const playlistID = playlist._id;
  const dispatch = useDispatch();
  const handleClick = useCallback(() => {
    const selectedItems = selection.isSelected(media) ? selection.get() : [media];

    dispatch(removeMedia(playlistID, selectedItems));
  }, [dispatch, playlistID, media, selection]);

  return (
    <MediaAction onClick={handleClick}>
      <SvgIcon>
        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
      </SvgIcon>
    </MediaAction>
  );
}

RemoveFromPlaylistAction.propTypes = {
  media: PropTypes.object.isRequired,
};

export default RemoveFromPlaylistAction;
