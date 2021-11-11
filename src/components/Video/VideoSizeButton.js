import React from 'react';
import { useTranslator } from '@u-wave/react-translate';
import { useDispatch, useSelector } from 'react-redux';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import SvgIcon from '@mui/material/SvgIcon';
import { videoSizeSelector } from '../../selectors/settingSelectors';
import { toggleVideoSize } from '../../actions/PlaybackActionCreators';

// Stolen from YouTube
const paths = {
  // Currently small, show "enlarge" icon:
  small: 'm 28,11 0,14 -20,0 0,-14 z m -18,2 16,0 0,10 -16,0 0,-10 z',
  // Currently large, show smaller icon: ("ensmall"?! 😂)
  large: 'm 26,13 0,10 -16,0 0,-10 z m -14,2 12,0 0,6 -12,0 0,-6 z',
};

function VideoSizeButton() {
  const { t } = useTranslator();
  const videoSize = useSelector(videoSizeSelector);
  const dispatch = useDispatch();

  const onToggleVideoSize = () => {
    dispatch(toggleVideoSize());
  };

  return (
    <Tooltip
      title={videoSize === 'large'
        ? t('settings.disableLargeVideo')
        : t('settings.enableLargeVideo')}
      placement="bottom"
    >
      <IconButton onClick={onToggleVideoSize}>
        <SvgIcon viewBox="6 6 24 24">
          <path d={paths[videoSize]} fillRule="evenodd" />
        </SvgIcon>
      </IconButton>
    </Tooltip>
  );
}

export default VideoSizeButton;
