import * as React from 'react';
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
  isFavorite: React.PropTypes.bool,
  isOpen: React.PropTypes.bool,
  position: React.PropTypes.shape({
    x: React.PropTypes.number.isRequired,
    y: React.PropTypes.number.isRequired
  }),
  playlists: React.PropTypes.arrayOf(React.PropTypes.object),
  media: React.PropTypes.arrayOf(React.PropTypes.object),
  historyID: React.PropTypes.string,

  onClose: React.PropTypes.func.isRequired,
  onCreatePlaylist: React.PropTypes.func.isRequired,
  onAddMedia: React.PropTypes.func.isRequired,
  onFavoriteMedia: React.PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(AddToPlaylistMenuContainer);
