import cx from 'classnames';
import React from 'react';
import SongTitle from '../SongTitle';
import Eta from './Eta';

const NextMedia = ({ className, playlist, nextMedia, ...attrs }) => {
  if (!playlist || !nextMedia) {
    return (
      <div className={cx('NextMedia', className)} {...attrs}>
        You don't have a playlist yet!
      </div>
    );
  }

  const mediaEl = <SongTitle {...nextMedia} />;
  const playlistEl = <span className="NextMedia-playlist">{playlist.name}</span>;
  const etaEl = <Eta className="NextMedia-eta" />;
  return (
    <div className={cx('NextMedia', className)} {...attrs}>
      {mediaEl} from {playlistEl} in {etaEl}
    </div>
  );
};

export default NextMedia;
