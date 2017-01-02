import cx from 'classnames';
import isEqual from 'is-equal-shallow';
import * as React from 'react';
import screenfull from 'screenfull';

import injectMediaSources from '../../utils/injectMediaSources';

import VideoProgressBar from './VideoProgressBar';
import VideoToolbar from './VideoToolbar';
import MouseMoveCapture from './VideoMouseMoveCapture';

const defaultSourceTools = () => null;

@injectMediaSources()
export default class Video extends React.Component {
  static propTypes = {
    getAllMediaSources: React.PropTypes.func.isRequired,
    isFullscreen: React.PropTypes.bool,
    enabled: React.PropTypes.bool,
    size: React.PropTypes.string,
    volume: React.PropTypes.number,
    isMuted: React.PropTypes.bool,
    media: React.PropTypes.object,
    seek: React.PropTypes.number,
    onFullscreenEnter: React.PropTypes.func.isRequired,
    onFullscreenExit: React.PropTypes.func.isRequired
  };

  state = {
    shouldShowToolbar: false
  };

  componentDidMount() {
    if (screenfull.enabled) {
      document.documentElement.addEventListener(
        screenfull.raw.fullscreenchange,
        this.handleFullscreenChange
      );
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.isFullscreen && nextProps.isFullscreen && screenfull.enabled) {
      screenfull.request(this.element);
    }
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
      getAllMediaSources,
      isFullscreen,
      enabled,
      size,
      volume,
      isMuted,
      media,
      seek,
      onFullscreenEnter,
      onFullscreenExit
    } = this.props;

    if (!media) {
      return <div className="Video" />;
    }

    const {
      shouldShowToolbar
    } = this.state;

    const props = {
      enabled,
      media,
      seek,
      mode: size,
      volume: isMuted ? 0 : volume
    };

    const sources = getAllMediaSources();
    const players = Object.keys(sources).map((sourceType) => {
      if (sources[sourceType].Player) {
        const { Player } = sources[sourceType];
        return (
          <Player
            key={sourceType}
            {...props}
            active={media.sourceType === sourceType}
          />
        );
      }
      return null;
    }).filter(Boolean);

    const currentSource = sources[media.sourceType];
    const MediaSourceTools = (currentSource && currentSource.VideoTools)
      ? currentSource.VideoTools
      : defaultSourceTools;

    return (
      <div
        ref={this.refElement}
        className={cx('Video', `Video--${media.sourceType}`, `Video--${size}`)}
      >
        {players}

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
            onFullscreenEnter={onFullscreenEnter}
            onFullscreenExit={onFullscreenExit}
          >
            <MediaSourceTools media={media} />
          </VideoToolbar>
        )}
      </div>
    );
  }
}
