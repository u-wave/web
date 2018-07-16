import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import createDebug from 'debug';
import { translate } from 'react-i18next';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ErrorIcon from '@material-ui/icons/Error';
import SongInfo from './SongInfo';
import soundcloudLogo from '../../../assets/img/soundcloud-inline.png';

const debug = createDebug('uwave:component:video:soundcloud');

const CLIENT_ID = '9d883cdd4c3c54c6dddda2a5b3a11200';

function getErrorMessage(err) {
  if (err.name === 'MediaError') {
    if (err.code === 2) {
      return 'soundcloud.error.network';
    }
    if (err.code === 3) {
      return 'soundcloud.error.decode';
    }
    if (err.code === 4 && /404|not found/i.test(err.message)) {
      return 'soundcloud.error.notFound';
    }
  }
  return err.message;
}

const enhance = translate();

class SoundCloudPlayer extends React.Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    className: PropTypes.string,
    active: PropTypes.bool.isRequired,
    enabled: PropTypes.bool,
    media: PropTypes.object,
    seek: PropTypes.number,
    volume: PropTypes.number,
    onPlay: PropTypes.func,
  };

  state = {
    error: null,
    needsTap: false,
  };

  componentDidMount() {
    this.audio = new Audio();
    this.audio.addEventListener('error', () => {
      this.handleError(this.audio.error);
    });
    this.audio.autoplay = true;
    this.play();
  }

  componentDidUpdate(prevProps) {
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

  handleError = (error) => {
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
        this.audio.currentTime = seek + (media.start || 0);
        this.audio.volume = volume / 100;
        this.audio.removeEventListener('canplaythrough', doSeek, false);
      };

      const { streamUrl } = media.sourceData;
      this.audio.src = `${streamUrl}?client_id=${CLIENT_ID}`;
      const res = this.audio.play();
      if (res && res.then) res.catch(this.handleError);
      debug('currentTime', seek);
      this.audio.addEventListener('canplaythrough', doSeek, false);
      if (onPlay) {
        this.audio.addEventListener('play', onPlay, false);
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
    const { sourceData } = media;
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
            <Button variant="raised" color="primary" onClick={this.handlePlay}>
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
            <ErrorIcon className="src-soundcloud-Player-errorIcon" />
            <Typography component="p">
              {t('soundcloud.error.template', {
                error: t(getErrorMessage(error), { defaultValue: error.message }),
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
              src={soundcloudLogo}
              alt="SoundCloud"
            />
          </a>
        </div>
      </div>
    );
  }
}

export default enhance(SoundCloudPlayer);
