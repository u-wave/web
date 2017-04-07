import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { IDLE, LOADING, LOADED } from '../../constants/LoadingStates';

import {
  addMediaMenu as openAddMediaMenu
} from '../../actions/PlaylistActionCreators';
import { PLAYLIST, CHANNEL } from './constants';
import { importPlaylist } from './actions';
import LoadingPanel from './LoadingPanel';
import ChannelPanel from './ChannelPanel';
import PlaylistPanel from './PlaylistPanel';

const mapStateToProps = () => ({});
const mapDispatchToProps = dispatch => bindActionCreators({
  onImportPlaylist: importPlaylist,
  onOpenAddMediaMenu: openAddMediaMenu
}, dispatch);

const YouTubeImportPanel = ({ type, importingState, ...props }) => {
  if (importingState === LOADED) {
    if (type === PLAYLIST) {
      return <PlaylistPanel {...props} />;
    }
    return <ChannelPanel {...props} />;
  }
  return <LoadingPanel {...props} />;
};

YouTubeImportPanel.propTypes = {
  type: PropTypes.oneOf([ PLAYLIST, CHANNEL ]).isRequired,
  importingState: PropTypes.oneOf([ IDLE, LOADING, LOADED ])
};

export default connect(mapStateToProps, mapDispatchToProps)(YouTubeImportPanel);
