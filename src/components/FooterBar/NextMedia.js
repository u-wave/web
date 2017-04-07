import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
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
  t: PropTypes.func.isRequired,
  className: PropTypes.string,
  playlist: PropTypes.object,
  nextMedia: PropTypes.object,
  userInWaitlist: PropTypes.bool.isRequired,
  userIsDJ: PropTypes.bool.isRequired,
  baseEta: PropTypes.number,
  mediaEndTime: PropTypes.number
};

export default compose(
  translate(),
  pure
)(NextMedia);
