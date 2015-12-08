import React, { Component } from 'react';
import { connect } from 'react-redux';

import HeaderBar from './';

function mapStateToProps({ booth, users }) {
  const media = booth.media;
  return {
    mediaStartTime: booth.startTime,
    mediaDuration: media ? media.end - media.start : 0,
    media: media,
    dj: users[booth.djID]
  };
}
function mapDispatchToProps() {
  return {};
}

@connect(mapStateToProps, mapDispatchToProps)
export default class HeaderBarContainer extends Component {
  render() {
    return <HeaderBar {...this.props} />;
  }
}
