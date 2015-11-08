import cx from 'classnames';
import React from 'react';
import SongTitle from '../SongTitle';
import Eta from './Eta';

const NextMedia = ({ className, playlist, nextMedia, eta, ...attrs }) => {
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
  const etaEl = <Eta className="NextMedia-eta" eta={eta} />;
  return (
    <div className={cx('NextMedia', className)} {...attrs}>
      {mediaEl} from {playlistEl} {etaEl}
    </div>
  );
};

export default NextMedia;
