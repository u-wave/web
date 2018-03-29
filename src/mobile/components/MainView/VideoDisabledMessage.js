import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import RaisedButton from 'material-ui/RaisedButton';

const enhance = translate();

const VideoDisabledMessage = ({ t, onEnableVideo }) => (
  <div className="VideoDisabledMessage">
    <p className="VideoDisabledMessage-text">{t('booth.videoDisabled')}</p>
    <RaisedButton
      primary
      label="Enable?"
      onClick={onEnableVideo}
    />
  </div>
);

VideoDisabledMessage.propTypes = {
  t: PropTypes.func.isRequired,
  onEnableVideo: PropTypes.func.isRequired,
};

export default enhance(VideoDisabledMessage);
