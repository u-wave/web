/* eslint-disable react/prefer-stateless-function */
import cx from 'classnames';
import * as React from 'react';

import VideoBackdrop from '../../components/Video/VideoBackdrop';
import YouTubePlayerEmbed from './PlayerEmbed';

export default class YouTubePlayer extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    mode: React.PropTypes.oneOf([ 'small', 'large', 'preview' ]),
    active: React.PropTypes.bool.isRequired,
    enabled: React.PropTypes.bool,
    media: React.PropTypes.object,
    seek: React.PropTypes.number,
    volume: React.PropTypes.number
  };

  render() {
    const { active, className, enabled, mode, media } = this.props;
    const modeClass = `src-youtube-Player--${mode}`;

    let backdrop;
    if (active && mode !== 'large') {
      backdrop = <VideoBackdrop url={media.thumbnail} />;
    }
    // Wrapper span so the backdrop can be full-size…
    return (
      <span hidden={!active}>
        {backdrop}
        <div className={cx('src-youtube-Player', modeClass, className)}>
          {enabled && <YouTubePlayerEmbed
            media={media}
            active={active}
            seek={Math.round(this.props.seek)}
            volume={this.props.volume}
          />}
        </div>
      </span>
    );
  }
}
/* eslint-enable react/prefer-stateless-function */
