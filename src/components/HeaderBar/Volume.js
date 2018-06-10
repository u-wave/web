import cx from 'classnames';
import React from 'react';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import VolumeDownIcon from '@material-ui/icons/VolumeDown';
import VolumeMuteIcon from '@material-ui/icons/VolumeMute';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import Slider from '@material-ui/lab/Slider';

const enhance = translate();

class Volume extends React.Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    className: PropTypes.string,
    volume: PropTypes.number,
    muted: PropTypes.bool,

    onVolumeChange: PropTypes.func,
    onMute: PropTypes.func,
    onUnmute: PropTypes.func,
  };

  shouldComponentUpdate(nextProps) {
    return this.props.volume !== nextProps.volume ||
      this.props.muted !== nextProps.muted;
  }

  handleVolumeChange = (e, volume) => {
    this.props.onVolumeChange(volume);
  };

  handleMuteClick = () => {
    if (this.props.muted) {
      this.props.onUnmute();
    } else {
      this.props.onMute();
    }
  };

  render() {
    const {
      t,
      className,
      muted,
      volume,
    } = this.props;

    let VolumeIcon = VolumeUpIcon;
    if (muted) {
      VolumeIcon = VolumeOffIcon;
    } else if (volume === 0) {
      VolumeIcon = VolumeMuteIcon;
    } else if (volume < 50) {
      VolumeIcon = VolumeDownIcon;
    }

    const label = muted ? t('booth.unmute') : t('booth.mute');

    return (
      <div className={cx('VolumeSlider', className)}>
        <Tooltip title={label} position="bottom">
          <IconButton
            aria-label={label}
            onClick={this.handleMuteClick}
          >
            <VolumeIcon />
          </IconButton>
        </Tooltip>
        <div className="VolumeSlider-slider">
          <Slider
            min={0}
            max={100}
            step={1}
            value={volume}
            onChange={this.handleVolumeChange}
          />
        </div>
      </div>
    );
  }
}

export default enhance(Volume);
