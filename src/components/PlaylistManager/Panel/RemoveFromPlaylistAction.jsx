import React from 'react';
import PropTypes from 'prop-types';
import { mdiDelete } from '@mdi/js';
import { useDispatch } from '../../../hooks/useRedux';
import { useMediaListContext } from '../../MediaList/BaseMediaList';
import SvgIcon from '../../SvgIcon';
import MediaAction from '../../MediaList/MediaAction';
import { removePlaylistItems } from '../../../reducers/playlists';

const {
  useCallback,
} = React;

function RemoveFromPlaylistAction({ media }) {
  const { playlist, selection } = useMediaListContext();
  const playlistID = playlist._id;
  const dispatch = useDispatch();
  const handleClick = useCallback(() => {
    const selectedItems = selection.isSelected(media) ? selection.get() : [media];

    dispatch(removePlaylistItems({
      playlistID,
      medias: selectedItems,
    }));
  }, [dispatch, playlistID, media, selection]);

  return (
    <MediaAction onClick={handleClick}>
      <SvgIcon path={mdiDelete} />
    </MediaAction>
  );
}

RemoveFromPlaylistAction.propTypes = {
  media: PropTypes.object.isRequired,
};

export default RemoveFromPlaylistAction;
