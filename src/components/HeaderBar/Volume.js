import cx from 'clsx';
import React from 'react';
import { translate } from '@u-wave/react-translate';
import PropTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Slider from '@material-ui/core/Slider';
import VolumeDownIcon from '@material-ui/icons/VolumeDown';
import VolumeMuteIcon from '@material-ui/icons/VolumeMute';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';

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
    const { volume, muted } = this.props;

    return volume !== nextProps.volume
      || muted !== nextProps.muted;
  }

  handleVolumeChange = (e, volume) => {
    const { onVolumeChange } = this.props;

    onVolumeChange(volume);
  };

  handleMuteClick = () => {
    const { muted, onMute, onUnmute } = this.props;

    if (muted) {
      onUnmute();
    } else {
      onMute();
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
            size="small"
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
