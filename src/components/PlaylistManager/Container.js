import React, { Component } from 'react';
import { connect } from 'react-redux';
import values from 'object-values';

import PlaylistManager from './';

function mapStateToProps({ playlists, mediaSearch }) {
  return {
    playlists: values(playlists.playlists),
    activeMedia: playlists.activeMedia,
    selectedMedia: playlists.selectedMedia,

    searchSource: mediaSearch.sourceType,
    searchQuery: mediaSearch.query,
    searchResults: mediaSearch.results[mediaSearch.sourceType],
    searchLoadingState: mediaSearch.loadingState
  };
}

function mapDispatchToProps() {
  return {};
}

@connect(mapStateToProps, mapDispatchToProps)
export default class PlaylistManagerContainer extends Component {
  render() {
    return <PlaylistManager {...this.props} />;
  }
}
