import cx from 'clsx';
import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useTranslator } from '@u-wave/react-translate';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { mdiAlertCircle } from '@mdi/js';
import SvgIcon from '../../components/SvgIcon';
import SongInfo from './SongInfo';
import type { Media } from '../../reducers/booth';

const soundcloudLogo = new URL('../../../assets/img/soundcloud-inline.png', import.meta.url);

const CLIENT_ID = '9d883cdd4c3c54c6dddda2a5b3a11200';

function getErrorMessage(err: Error) {
  if (err.name === 'MediaError') {
    const { code } = err as MediaError & { name: 'MediaError' };
    if (code === 2) {
      return 'soundcloud.error.network';
    }
    if (code === 3) {
      return 'soundcloud.error.decode';
    }
    if (code === 4 && /404|not found/i.test(err.message)) {
      return 'soundcloud.error.notFound';
    }
  }
  return 'soundcloud.error.other';
}

type SoundCloudPlayerProps = {
  className?: string,
  active: boolean,
  enabled: boolean,
  media: Media,
  seek: number,
  volume: number,
  onPlay?: () => void,
};
function SoundCloudPlayer({
  className,
  active,
  enabled,
  media,
  seek,
  volume,
  onPlay,
}: SoundCloudPlayerProps) {
  const { t } = useTranslator();
  const audioRef = useRef<HTMLAudioElement|null>(null);
  const [error, setError] = useState<Error|null>(null);
  const needsTap = error?.name === 'NotAllowedError';

  const audioUrl = useMemo(() => {
    if (media.sourceData != null && typeof media.sourceData.streamUrl === 'string'
        && enabled && active) {
      const { streamUrl } = media.sourceData;
      return `${streamUrl}?client_id=${CLIENT_ID}`;
    }
    return null;
  }, [media, enabled, active]);

  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;
    audio.addEventListener('error', () => {
      if (audio.error) {
        setError(Object.assign(audio.error, { name: 'MediaError' }));
      } else {
        setError(new Error('Unknown error'));
      }
    });
  }, []);

  useEffect(() => {
    setError(null);
    if (!audioRef.current || !audioUrl) {
      return () => {
        // dummy
      };
    }
    const audio = audioRef.current;
    audio.src = audioUrl;
    audio.play().catch(setError);
    const doSeek = () => {
      audio.currentTime = seek + (media.start ?? 0);
      audio.removeEventListener('canplaythrough', doSeek, false);
    };
    audio.addEventListener('canplaythrough', doSeek, false);

    return () => {
      audio.pause();
      audio.removeEventListener('canplaythrough', doSeek, false);
    };

    // `seek` / `media.start` should only be taken into account when
    // the media changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioUrl]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  useEffect(() => {
    const handler = () => {
      setError(null);
      onPlay?.();
    };

    const audio = audioRef.current;
    if (audio) {
      audio.addEventListener('play', handler, false);
    }
    return () => {
      if (audio) {
        audio.removeEventListener('play', handler);
      }
    };
  }, [onPlay]);

  const sourceData = media.sourceData as undefined | {
    username: string,
    fullTitle: string,
    artistUrl: string,
    permalinkUrl: string,
  };
  if (!sourceData) {
    return <div className={cx('src-soundcloud-Player', className)} />;
  }

  if (needsTap) {
    return (
      <div className={cx('src-soundcloud-Player', className)}>
        <Paper className="src-soundcloud-Player-message">
          <Typography component="p" paragraph>
            {t('booth.autoplayBlocked')}
          </Typography>
          <Button variant="contained" onClick={() => audioRef.current?.play()}>
            {t('booth.play')}
          </Button>
        </Paper>
      </div>
    );
  }

  if (error) {
    return (
      <div className={cx('src-soundcloud-Player', className)}>
        <Paper className="src-soundcloud-Player-error">
          <SvgIcon path={mdiAlertCircle} className="src-soundcloud-Player-errorIcon" />
          <Typography component="p">
            {t('soundcloud.error.template', {
              error: t(getErrorMessage(error), { message: error.message }),
            })}
          </Typography>
        </Paper>
      </div>
    );
  }

  return (
    <div className={cx('src-soundcloud-Player', className)}>
      <div className="src-soundcloud-Player-meta">
        <div className="src-soundcloud-Player-info">
          <img
            className="src-soundcloud-Player-art"
            src={media.thumbnail}
            alt=""
          />
          <div className="src-soundcloud-Player-links">
            <SongInfo
              artist={sourceData.username}
              title={sourceData.fullTitle}
              artistUrl={sourceData.artistUrl}
              trackUrl={sourceData.permalinkUrl}
            />
          </div>
        </div>
        <a
          href={sourceData.permalinkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="src-soundcloud-Player-permalink"
        >
          View on{' '}
          <img src={soundcloudLogo.href} alt="SoundCloud" />
        </a>
      </div>
    </div>
  );
}

export default SoundCloudPlayer;
