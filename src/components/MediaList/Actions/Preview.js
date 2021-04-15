import React from 'react';
import PropTypes from 'prop-types';
import PlayIcon from '@material-ui/icons/PlayArrow';
import Action from './Action';

const Preview = ({ onPreview, ...props }) => (
  <Action {...props} onAction={onPreview}>
    <PlayIcon />
  </Action>
);

Preview.propTypes = {
  onPreview: PropTypes.func.isRequired,
};

export default Preview;
