import React from 'react';
import PropTypes from 'prop-types';
import { mdiChevronDown } from '@mdi/js';
import { useDispatch } from '../../../hooks/useRedux';
import { movePlaylistItems } from '../../../reducers/playlists';
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

    dispatch(movePlaylistItems({
      playlistID: playlist._id,
      medias: selectedItems,
      target: { at: 'end' },
    }));
  }, [dispatch, playlist, media, selection]);

  return (
    <MediaAction onClick={handleClick}>
      <SvgIcon path={mdiChevronDown} />
    </MediaAction>
  );
}

MoveToLastAction.propTypes = {
  media: PropTypes.object.isRequired,
};

export default MoveToLastAction;
