import cx from 'classnames';
import * as React from 'react';
import pure from 'recompose/pure';
import SongTitle from '../SongTitle';
import Eta from './Eta';

const NextMedia = ({
  className, playlist, nextMedia, userIsDJ, eta,
  ...attrs
}) => {
  if (!playlist) {
    return (
      <div className={cx('NextMedia', className)} {...attrs}>
        You don't have a playlist yet!
      </div>
    );
  }

  const mediaEl = nextMedia ? <SongTitle {...nextMedia} />
    : <div className="SongTitle">This playlist is empty :(</div>;
  const playlistEl = <span className="NextMedia-playlist">{playlist.name}</span>;
  const etaEl = (
    <Eta
      className="NextMedia-eta"
      eta={eta}
      nowPlaying={userIsDJ}
    />
  );
  return (
    <div className={cx('NextMedia', className)} {...attrs}>
      {mediaEl} from {playlistEl} {etaEl}
    </div>
  );
};

NextMedia.propTypes = {
  className: React.PropTypes.string,
  playlist: React.PropTypes.object,
  nextMedia: React.PropTypes.object,
  userIsDJ: React.PropTypes.bool,
  eta: React.PropTypes.number
};

export default pure(NextMedia);
