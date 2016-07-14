/* eslint-disable react/prefer-stateless-function */
import React, { Component, PropTypes } from 'react';
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
  isFavoriteSelector, isOpenSelector, positionSelector,
  mediaSelector, historyIDSelector
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

@connect(mapStateToProps, mapDispatchToProps)
export default class AddToPlaylistMenuContainer extends Component {
  static propTypes = {
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

  render() {
    const {
      onCreatePlaylist,
      onAddMedia,
      onFavoriteMedia,
      onClose
    } = this.props;
    const { isOpen, position, isFavorite, playlists, media, historyID } = this.props;
    if (!isOpen) {
      return <span />;
    }

    const onSelect = playlist => {
      if (isFavorite) {
        onFavoriteMedia(playlist, historyID);
      } else {
        onAddMedia(playlist, media);
      }
    };

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
  }
}
/* eslint-enable react/prefer-stateless-function */
