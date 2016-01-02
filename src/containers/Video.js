import React, { Component } from 'react';
import { connect } from 'react-redux';

import { videoSelector } from '../selectors/boothSelectors';
import Video from '../components/Video';

@connect(videoSelector)
export default class VideoContainer extends Component {
  render() {
    return <Video {...this.props} />;
  }
}
