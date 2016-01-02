import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addMedia, closeAddMediaMenu } from '../actions/PlaylistActionCreators';

import { addToPlaylistMenuSelector } from '../selectors/addToPlaylistMenuSelectors';
import AddToPlaylistMenu from '../components/AddToPlaylistMenu';

const mapDispatchToProps = dispatch => bindActionCreators({
  onClose: closeAddMediaMenu,
  onSelect: addMedia
}, dispatch);

@connect(addToPlaylistMenuSelector, mapDispatchToProps)
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
