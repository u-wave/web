import React from 'react';
import PropTypes from 'prop-types';
import Player from './Player';
import PreviewPlayer from './PreviewPlayer';

const PlayerWrapper = (props) => {
  if (props.mode === 'preview') {
    return <PreviewPlayer {...props} />;
  }
  return <Player {...props} />;
};

PlayerWrapper.propTypes = {
  mode: PropTypes.string.isRequired
};

export default PlayerWrapper;
