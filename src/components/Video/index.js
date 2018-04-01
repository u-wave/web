import cx from 'classnames';
import isEqual from 'is-equal-shallow';
import React from 'react';
import PropTypes from 'prop-types';
import screenfull from 'screenfull';
import injectMediaSources from '../../utils/injectMediaSources';
import VideoBackdrop from './VideoBackdrop';
import VideoProgressBar from './VideoProgressBar';
import VideoToolbar from './VideoToolbar';
import MouseMoveCapture from './VideoMouseMoveCapture';
import Player from '../Player';

const defaultSourceTools = () => null;

const enhance = injectMediaSources();

class Video extends React.Component {
  static propTypes = {
    getMediaSource: PropTypes.func.isRequired,
    isFullscreen: PropTypes.bool,
    enabled: PropTypes.bool,
    size: PropTypes.string,
    volume: PropTypes.number,
    isMuted: PropTypes.bool,
    media: PropTypes.object,
    seek: PropTypes.number,
    onFullscreenEnter: PropTypes.func.isRequired,
    onFullscreenExit: PropTypes.func.isRequired,
  };

  state = {
    shouldShowToolbar: false,
  };

  componentDidMount() {
    if (screenfull.enabled) {
      screenfull.on('change', this.handleFullscreenChange);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isFullscreen && !nextProps.isFullscreen && screenfull.enabled) {
      // Checking for `enabled` here, because our props have probably changed
      // _after_ exiting fullscreen mode (see `this.handleFullscreenChange`).
      // This way we don't double-exit.
      if (screenfull.isFullscreen) {
        screenfull.exit();
      }
    }
  }

  shouldComponentUpdate(nextProps) {
    return !isEqual(nextProps, this.props);
  }

  handleFullscreenEnter = () => {
    if (screenfull.enabled) {
      screenfull.request(this.element);
    }
    this.props.onFullscreenEnter();
  };

  handleFullscreenChange = () => {
    if (!screenfull.isFullscreen) {
      this.props.onFullscreenExit();
    }
  };

  handleMouseMove = () => {
    if (this.timer) {
      clearTimeout(this.timer);
    } else {
      this.setState({ shouldShowToolbar: true });
    }
    this.timer = setTimeout(this.handleMouseMoveEnd, 5000);
  };

  handleMouseMoveEnd = () => {
    clearTimeout(this.timer);
    this.timer = null;
    this.setState({ shouldShowToolbar: false });
  };

  refElement = (element) => {
    this.element = element;
  };

  render() {
    const {
      getMediaSource,
      isFullscreen,
      enabled,
      size,
      volume,
      isMuted,
      media,
      seek,
      onFullscreenExit,
    } = this.props;

    if (!media) {
      return <div className="Video" />;
    }

    const {
      shouldShowToolbar,
    } = this.state;

    const currentSource = getMediaSource(media.sourceType);
    const MediaSourceTools = (currentSource && currentSource.VideoTools)
      ? currentSource.VideoTools
      : defaultSourceTools;

    return (
      <div
        ref={this.refElement}
        className={cx('Video', `Video--${media.sourceType}`, `Video--${size}`)}
      >
        <VideoBackdrop url={media.thumbnail} />
        <Player
          enabled={enabled}
          size={size}
          volume={volume}
          isMuted={isMuted}
          media={media}
          seek={seek}
        />

        {isFullscreen && (
          <MouseMoveCapture
            active={shouldShowToolbar}
            onMouseMove={this.handleMouseMove}
          />
        )}
        {isFullscreen && (
          <VideoProgressBar
            media={media}
            seek={seek}
          />
        )}
        {(!isFullscreen || shouldShowToolbar) && (
          <VideoToolbar
            isFullscreen={isFullscreen}
            onFullscreenEnter={this.handleFullscreenEnter}
            onFullscreenExit={onFullscreenExit}
          >
            <MediaSourceTools media={media} />
          </VideoToolbar>
        )}
      </div>
    );
  }
}

export default enhance(Video);
