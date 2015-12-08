import React, { Component } from 'react';
import { connect } from 'react-redux';

import Video from './index';

const mapStateToProps = state => ({
  historyID: state.booth.historyID,
  media: state.booth.media,
  startTime: state.booth.startTime
});

@connect(mapStateToProps)
export default class VideoContainer extends Component {
  render() {
    return <Video {...this.props} />;
  }
}
