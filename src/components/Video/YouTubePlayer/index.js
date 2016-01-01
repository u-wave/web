import cx from 'classnames';
import React from 'react';

import VideoBackdrop from '../VideoBackdrop';
import YouTubePlayerEmbed from './Embed';

export default class YouTubePlayer extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    size: React.PropTypes.string,
    enabled: React.PropTypes.bool,
    media: React.PropTypes.object,
    seek: React.PropTypes.number,
    volume: React.PropTypes.number
  };

  render() {
    const { className, enabled, size, media } = this.props;
    const sizeClass = `YouTubePlayer--${size}`;

    let backdrop;
    if (size === 'small') {
      backdrop = <VideoBackdrop url={media.thumbnail} />;
    }
    // Wrapper span so the backdrop can be full-size…
    return (
      <span>
        {backdrop}
        <div className={cx('YouTubePlayer', sizeClass, className)}>
          {enabled && <YouTubePlayerEmbed
            media={media}
            seek={this.props.seek}
            volume={this.props.volume}
          />}
        </div>
      </span>
    );
  }
}
