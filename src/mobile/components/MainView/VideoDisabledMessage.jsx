import React from 'react';
import PropTypes from 'prop-types';
import { useTranslator } from '@u-wave/react-translate';
import Button from '@mui/material/Button';

function VideoDisabledMessage({ onEnableVideo }) {
  const { t } = useTranslator();

  return (
    <div className="VideoDisabledMessage">
      <p className="VideoDisabledMessage-text">{t('booth.videoDisabled')}</p>
      <Button variant="contained" onClick={onEnableVideo}>
        Enable?
      </Button>
    </div>
  );
}

VideoDisabledMessage.propTypes = {
  onEnableVideo: PropTypes.func.isRequired,
};

export default VideoDisabledMessage;
