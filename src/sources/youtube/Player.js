import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import YouTubePlayerEmbed from './PlayerEmbed';
import {
  setAvailableQualityLevels,
  setCurrentQualityLevel
} from './actions';

const enhance = connect(
  state => ({
    preferredQuality: state.sources.youtube.preferredQualityLevel
  }),
  {
    onQualityLevels: setAvailableQualityLevels,
    onQualityChange: setCurrentQualityLevel
  }
);

const YouTubePlayer = ({
  active,
  className,
  enabled,
  mode,
  media,
  seek,
  volume,
  preferredQuality,
  onQualityLevels,
  onQualityChange
}) => {
  const modeClass = `src-youtube-Player--${mode}`;

  // Wrapper span so the backdrop can be full-size…
  return (
    <span hidden={!active}>
      <div className={cx('src-youtube-Player', modeClass, className)}>
        {enabled && (
          <YouTubePlayerEmbed
            media={media}
            active={active}
            seek={Math.round(seek)}
            volume={volume}
            controllable={mode === 'preview'}
            preferredQuality={preferredQuality}
            onQualityLevels={onQualityLevels}
            onQualityChange={onQualityChange}
          />
        )}
      </div>
    </span>
  );
};

YouTubePlayer.propTypes = {
  className: PropTypes.string,
  mode: PropTypes.oneOf([ 'small', 'large', 'preview' ]),
  active: PropTypes.bool.isRequired,
  enabled: PropTypes.bool,
  media: PropTypes.object,
  seek: PropTypes.number,
  volume: PropTypes.number,
  preferredQuality: PropTypes.string,
  onQualityLevels: PropTypes.func.isRequired,
  onQualityChange: PropTypes.func.isRequired
};

export default enhance(YouTubePlayer);
