import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import Button from '@material-ui/core/Button';

const enhance = translate();

const VideoDisabledMessage = ({ t, onEnableVideo }) => (
  <div className="VideoDisabledMessage">
    <p className="VideoDisabledMessage-text">{t('booth.videoDisabled')}</p>
    <Button variant="raised" color="primary" onClick={onEnableVideo}>
      {'Enable?'}
    </Button>
  </div>
);

VideoDisabledMessage.propTypes = {
  t: PropTypes.func.isRequired,
  onEnableVideo: PropTypes.func.isRequired,
};

export default enhance(VideoDisabledMessage);
