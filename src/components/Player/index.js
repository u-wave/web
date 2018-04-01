import cx from 'classnames';
import isEqual from 'is-equal-shallow';
import React from 'react';
import PropTypes from 'prop-types';
import injectMediaSources from '../../utils/injectMediaSources';

const enhance = injectMediaSources();

class Player extends React.Component {
  static propTypes = {
    getAllMediaSources: PropTypes.func.isRequired,
    enabled: PropTypes.bool,
    size: PropTypes.string,
    volume: PropTypes.number,
    isMuted: PropTypes.bool,
    media: PropTypes.object,
    seek: PropTypes.number,
  };

  shouldComponentUpdate(nextProps) {
    return !isEqual(nextProps, this.props);
  }

  render() {
    const {
      getAllMediaSources,
      enabled,
      size,
      volume,
      isMuted,
      media,
      seek,
    } = this.props;

    if (!media) {
      return <div className="Player" />;
    }

    const props = {
      enabled,
      media,
      seek,
      mode: size,
      volume: isMuted ? 0 : volume,
    };

    const sources = getAllMediaSources();
    const players = Object.keys(sources).map((sourceType) => {
      const SourcePlayer = sources[sourceType].Player;
      if (!SourcePlayer) {
        return null;
      }
      return (
        <SourcePlayer
          key={sourceType}
          {...props}
          active={media.sourceType === sourceType}
        />
      );
    }).filter(player => player !== null);

    return (
      <div className={cx('Player', `Player--${media.sourceType}`, `Player--${size}`)}>
        {players}
      </div>
    );
  }
}

export default enhance(Player);
