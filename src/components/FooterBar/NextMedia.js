import cx from 'classnames';
import * as React from 'react';
import { translate, Interpolate } from 'react-i18next';
import compose from 'recompose/compose';
import pure from 'recompose/pure';
import SongTitle from '../SongTitle';
import Eta from './Eta';

const NextMedia = ({
  t,
  className,
  playlist,
  nextMedia,
  userIsDJ,
  baseEta,
  mediaEndTime,
  ...attrs
}) => {
  if (!playlist) {
    return (
      <div className={cx('NextMedia', className)} {...attrs}>
        {t('playlists.noPlaylistsCreate')}
      </div>
    );
  }

  const mediaEl = nextMedia
    ? <SongTitle {...nextMedia} />
    : <div className="SongTitle">{t('playlists.empty')}</div>;
  const playlistEl = (
    <span className="NextMedia-playlist">{playlist.name}</span>
  );
  const etaEl = (
    <Eta
      className="NextMedia-eta"
      base={baseEta}
      endTime={mediaEndTime}
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
  t: React.PropTypes.func.isRequired,
  className: React.PropTypes.string,
  playlist: React.PropTypes.object,
  nextMedia: React.PropTypes.object,
  userIsDJ: React.PropTypes.bool,
  baseEta: React.PropTypes.number,
  mediaEndTime: React.PropTypes.number
};

export default compose(
  translate(),
  pure
)(NextMedia);
