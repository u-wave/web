import cx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslator, Interpolate } from '@u-wave/react-translate';
import SongTitle from '../SongTitle';
import Eta from './Eta';

function NextMedia({
  className,
  playlist,
  nextMedia,
  userInWaitlist,
  userIsDJ,
  baseEta,
  mediaEndTime,
}) {
  const { t } = useTranslator();

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
}

NextMedia.propTypes = {
  className: PropTypes.string,
  playlist: PropTypes.object,
  nextMedia: PropTypes.object,
  userInWaitlist: PropTypes.bool.isRequired,
  userIsDJ: PropTypes.bool.isRequired,
  baseEta: PropTypes.number,
  mediaEndTime: PropTypes.number,
};

export default React.memo(NextMedia);
