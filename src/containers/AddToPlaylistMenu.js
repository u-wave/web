import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import naturalCmp from 'natural-compare';
import values from 'object-values';
import { addMedia, closeAddMediaMenu } from '../actions/PlaylistActionCreators';

import AddToPlaylistMenu from '../components/AddToPlaylistMenu';

const byName = (a, b) => naturalCmp(a.name.toLowerCase(), b.name.toLowerCase());

const mapStateToProps = state => ({
  open: state.addToPlaylistMenu.open,
  position: state.addToPlaylistMenu.position,
  playlists: values(state.playlists.playlists).sort(byName),
  media: state.addToPlaylistMenu.media
});

const mapDispatchToProps = dispatch => bindActionCreators({
  onClose: closeAddMediaMenu,
  onSelect: addMedia
}, dispatch);

@connect(mapStateToProps, mapDispatchToProps)
export default class AddToPlaylistMenuContainer extends Component {
  static propTypes = {
    open: PropTypes.bool
  };
  render() {
    return this.props.open
      ? <AddToPlaylistMenu {...this.props} />
      : <span />;
  }
}
