import omit from 'just-omit';
import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { addMediaMenu } from '../../actions/PlaylistActionCreators';
import { useMediaListContext } from './BaseMediaList';
import SvgIcon from '../SvgIcon';
import MediaAction from './MediaAction';

const {
  useCallback,
} = React;

/**
 * @param {object} props
 * @param {object} props.media
 * @param {boolean} [props.withCustomMeta] - Use the artist/title that is stored on this item.
 *   Set to false when dealing with eg. search results, to make the server look up a default
 *   artist/title for this media.
 */
function AddToPlaylistAction({ media, withCustomMeta = true }) {
  const { selection } = useMediaListContext();

  const dispatch = useDispatch();
  const handleClick = useCallback((event) => {
    let selectedItems = selection.isSelected(media) ? selection.get() : [media];
    if (!withCustomMeta) {
      selectedItems = selectedItems.map((item) => omit(item, ['artist', 'title']));
    }
    const rect = event.target.getBoundingClientRect();

    dispatch(addMediaMenu(selectedItems, {
      x: rect.left,
      y: rect.top,
    }));
  }, [dispatch, selection, media, withCustomMeta]);

  return (
    <MediaAction onClick={handleClick}>
      <SvgIcon>
        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
      </SvgIcon>
    </MediaAction>
  );
}

AddToPlaylistAction.propTypes = {
  media: PropTypes.object.isRequired,
  withCustomMeta: PropTypes.bool,
};

export default AddToPlaylistAction;
