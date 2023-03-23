import cx from 'clsx';
import React from 'react';
import { translate } from '@u-wave/react-translate';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { mdiAlertCircle } from '@mdi/js';
import SvgIcon from '../../components/SvgIcon';
import SongInfo from './SongInfo';
import { Media } from '../../reducers/booth';

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

const enhance = translate();

type SoundCloudPlayerProps = {
  t: (key: string, params?: object) => string,
  className?: string,
  active: boolean,
  enabled: boolean,
  media: Media,
  seek: number,
  volume: number,
  onPlay?: () => void,
};

type SoundCloudPlayerState = { error: Error | null, needsTap: boolean };
class SoundCloudPlayer extends React.Component<SoundCloudPlayerProps, SoundCloudPlayerState> {
  audio = new Audio();

  constructor(props: SoundCloudPlayerProps) {
    super(props);

    this.state = {
      error: null,
      needsTap: false,
    };
  }

  componentDidMount() {
    this.audio.addEventListener('error', () => {
      if (this.audio.error) {
        this.handleError(Object.assign(this.audio.error, { name: 'MediaError' }));
      } else {
        this.handleError(new Error('Unknown error'));
      }
    });
    this.audio.autoplay = true;
    this.play();
  }

  componentDidUpdate(prevProps: SoundCloudPlayerProps) {
    const {
      volume, active, enabled, media,
    } = this.props;

    if (prevProps.volume !== volume) {
      this.audio.volume = volume / 100;
    }
    if (prevProps.media.sourceID !== media.sourceID
        || prevProps.enabled !== enabled
        || prevProps.active !== active) {
      if (enabled && active) {
        this.play();
      } else {
        this.stop();
      }
    }
  }

  componentWillUnmount() {
    this.stop();
  }

  handleError = (error: Error) => {
    this.setState({
      error,
      needsTap: error.name === 'NotAllowedError',
    });
  };

  handlePlay = () => {
    this.play();
  };

  play() {
    const {
      active, enabled, media, volume, seek, onPlay,
    } = this.props;

    this.setState({ needsTap: false, error: null });
    if (enabled && active) {
      // In Firefox we have to wait for the "canplaythrough" event before
      // seeking.
      // http://stackoverflow.com/a/34970444
      const doSeek = () => {
        this.audio.currentTime = seek + (media.start ?? 0);
        this.audio.volume = volume / 100;
        this.audio.removeEventListener('canplaythrough', doSeek, false);
      };

      if ('streamUrl' in media.sourceData && typeof media.sourceData.streamUrl === 'string') {
        const { streamUrl } = media.sourceData;
        this.audio.src = `${streamUrl}?client_id=${CLIENT_ID}`;
        this.audio.play().catch(this.handleError);
        this.audio.addEventListener('canplaythrough', doSeek, false);
        if (onPlay) {
          this.audio.addEventListener('play', onPlay, false);
        }
      } else {
        this.handleError(new Error('Server did not send a stream URL'));
      }
    } else {
      this.stop();
    }
  }

  stop() {
    this.setState({ error: null });
    this.audio.pause();
  }

  render() {
    const { active } = this.props;
    if (!active) {
      return null;
    }

    const { t, media, className } = this.props;
    const { error, needsTap } = this.state;
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
            <Button variant="contained" onClick={this.handlePlay}>
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
            <img
              src={soundcloudLogo.href}
              alt="SoundCloud"
            />
          </a>
        </div>
      </div>
    );
  }
}

export default enhance(SoundCloudPlayer);
