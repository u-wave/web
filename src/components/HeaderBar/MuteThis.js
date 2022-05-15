import cx from 'clsx';
import React from 'react';
import { translate } from '@u-wave/react-translate';
import PropTypes from 'prop-types';
import Tooltip from '@mui/material/Tooltip';
import CancelOutlined from '@mui/icons-material/CancelOutlined';
import IconButton from '@mui/material/IconButton';

const enhance = translate();

class MuteThis extends React.Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    className: PropTypes.string,
    muted: PropTypes.bool,
    onMute: PropTypes.func,
    onUnmute: PropTypes.func,
  };

  shouldComponentUpdate(nextProps) {
    const { muted } = this.props;

    return muted !== nextProps.muted;
  }

  handleMuteClick = () => {
    const { muted, onMute, onUnmute } = this.props;

    if (muted) {
      onUnmute();
    } else {
      onMute();
    }
  };

  render() {
    const { t, className, muted } = this.props;

    const label = muted ? t('booth.unmuteThis') : t('booth.muteThis');

    return (
      <div className={cx('VolumeSlider', className)}>
        <Tooltip title={label} position="bottom">
          <IconButton aria-label={label} onClick={this.handleMuteClick} color={muted ? 'secondary' : 'default'}>
            <CancelOutlined />
          </IconButton>
        </Tooltip>
      </div>
    );
  }
}

export default enhance(MuteThis);
