import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  createPlaylist,
  addMedia,
  closeAddMediaMenu
} from '../actions/PlaylistActionCreators';
import { favoriteMedia } from '../actions/VoteActionCreators';

import {
  isFavoriteSelector,
  isOpenSelector,
  positionSelector,
  mediaSelector,
  historyIDSelector
} from '../selectors/addToPlaylistMenuSelectors';
import { playlistsSelector } from '../selectors/playlistSelectors';
import AddToPlaylistMenu from '../components/AddToPlaylistMenu';

const mapDispatchToProps = dispatch => bindActionCreators({
  onClose: closeAddMediaMenu,
  onCreatePlaylist: createPlaylist,
  onAddMedia: addMedia,
  onFavoriteMedia: favoriteMedia
}, dispatch);

const mapStateToProps = createStructuredSelector({
  isFavorite: isFavoriteSelector,
  isOpen: isOpenSelector,
  position: positionSelector,
  playlists: playlistsSelector,
  media: mediaSelector,
  historyID: historyIDSelector
});

const AddToPlaylistMenuContainer = ({
  isOpen,
  position,
  isFavorite,
  playlists,
  media,
  historyID,
  onCreatePlaylist,
  onAddMedia,
  onFavoriteMedia,
  onClose
}) => {
  if (!isOpen) {
    return <span />;
  }

  const onSelect = playlist => (
    isFavorite
      ? onFavoriteMedia(playlist, historyID)
      : onAddMedia(playlist, media)
  );

  return (
    <AddToPlaylistMenu
      open={isOpen}
      position={position}
      playlists={playlists}
      onClose={onClose}
      onCreatePlaylist={onCreatePlaylist}
      onSelect={onSelect}
    />
  );
};

AddToPlaylistMenuContainer.propTypes = {
  isFavorite: PropTypes.bool,
  isOpen: PropTypes.bool,
  position: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
  }),
  playlists: PropTypes.arrayOf(PropTypes.object),

  media: PropTypes.arrayOf(PropTypes.object),
  historyID: PropTypes.string,

  onClose: PropTypes.func.isRequired,
  onCreatePlaylist: PropTypes.func.isRequired,
  onAddMedia: PropTypes.func.isRequired,
  onFavoriteMedia: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(AddToPlaylistMenuContainer);
