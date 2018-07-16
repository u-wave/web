import React from 'react';
import PropTypes from 'prop-types';
import Player from './Player';
import PreviewPlayer from './PreviewPlayer';

const PlayerWrapper = ({ mode, ...props }) => {
  if (mode === 'preview') {
    return <PreviewPlayer {...props} />;
  }
  return <Player {...props} mode={mode} />;
};

PlayerWrapper.propTypes = {
  mode: PropTypes.string.isRequired,
};

export default PlayerWrapper;
