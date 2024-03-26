import cx from 'clsx';
import { useTranslator, Interpolate } from '@u-wave/react-translate';
import SongTitle from '../SongTitle';
import Eta from './Eta';
import type { Playlist, PlaylistItem } from '../../reducers/playlists';

type NextMediaProps = {
  className?: string,
  playlist: Playlist | null,
  nextMedia: PlaylistItem,
  userInWaitlist: boolean,
  userIsDJ: boolean,
  baseEta: number | null,
  mediaEndTime: number | null,
};
function NextMedia({
  className,
  playlist,
  nextMedia,
  userInWaitlist,
  userIsDJ,
  baseEta,
  mediaEndTime,
}: NextMediaProps) {
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
  const etaEl = baseEta != null && mediaEndTime != null ? (
    <Eta className="NextMedia-eta" base={baseEta} endTime={mediaEndTime} />
  ) : null;
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

export default NextMedia;
