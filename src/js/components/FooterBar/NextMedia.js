import cx from 'classnames';
import React from 'react';
import SongTitle from '../SongTitle';
import Eta from './Eta';

export default class NextMedia extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    playlist: React.PropTypes.object,
    nextMedia: React.PropTypes.object
  };

  render() {
    const { playlist, nextMedia, className } = this.props;
    if (!playlist || !nextMedia) {
      return (
        <div className={cx('NextMedia', className)}>
          You don't have a playlist yet!
        </div>
      );
    }

    const mediaEl = <SongTitle {...nextMedia} />;
    const playlistEl = <span className="NextMedia-playlist">{playlist.name}</span>;
    const etaEl = <Eta className="NextMedia-eta" />;
    return (
      <div className={cx('NextMedia', className)}>
        {mediaEl} from {playlistEl} in {etaEl}
      </div>
    );
  }
}
