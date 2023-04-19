import React from 'react';
import PropTypes from 'prop-types';
import { mdiChevronUp } from '@mdi/js';
import { useDispatch } from '../../../hooks/useRedux';
import { useMediaListContext } from '../../MediaList/BaseMediaList';
import SvgIcon from '../../SvgIcon';
import MediaAction from '../../MediaList/MediaAction';
import { movePlaylistItems } from '../../../reducers/playlists';

const {
  useCallback,
} = React;

function MoveToFirstAction({ media }) {
  const { playlist, selection } = useMediaListContext();
  const dispatch = useDispatch();
  const handleClick = useCallback(() => {
    const selectedItems = selection.isSelected(media) ? selection.get() : [media];

    dispatch(movePlaylistItems({
      playlistID: playlist._id,
      medias: selectedItems,
      target: { at: 'start' },
    }));
  }, [dispatch, playlist, media, selection]);

  return (
    <MediaAction onClick={handleClick}>
      <SvgIcon path={mdiChevronUp} />
    </MediaAction>
  );
}

MoveToFirstAction.propTypes = {
  media: PropTypes.object.isRequired,
};

export default MoveToFirstAction;
