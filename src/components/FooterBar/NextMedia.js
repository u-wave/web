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
  userInWaitlist,
  userIsDJ,
  baseEta,
  mediaEndTime
}) => {
  if (!playlist) {
    return (
      <div className={cx('NextMedia', className)}>
        {t('playlists.noPlaylistsCreate')}
      </div>
    );
  }

  let key = 'eta.empty';
  if (userIsDJ) {
    key = 'eta.playingNow';
  } else if (userInWaitlist) {
    key = 'eta.eta';
  }

  const mediaEl = nextMedia
    ? <SongTitle {...nextMedia} />
    : <div className="SongTitle">{t('playlists.empty')}</div>;
  const playlistEl = (
    <span className="NextMedia-playlist">{playlist.name}</span>
  );
  const etaEl = (
    <Eta className="NextMedia-eta" base={baseEta} endTime={mediaEndTime} />
  );
  return (
    <div className={cx('NextMedia', className)}>
      {mediaEl}
      <Interpolate
        i18nKey={key}
        playlist={playlistEl}
        eta={etaEl}
      />
    </div>
  );
};

NextMedia.propTypes = {
  t: React.PropTypes.func.isRequired,
  className: React.PropTypes.string,
  playlist: React.PropTypes.object,
  nextMedia: React.PropTypes.object,
  userInWaitlist: React.PropTypes.bool.isRequired,
  userIsDJ: React.PropTypes.bool.isRequired,
  baseEta: React.PropTypes.number,
  mediaEndTime: React.PropTypes.number
};

export default compose(
  translate(),
  pure
)(NextMedia);
