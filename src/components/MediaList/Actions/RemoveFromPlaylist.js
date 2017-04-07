import React from 'react';
import PropTypes from 'prop-types';
import DeleteIcon from 'material-ui/svg-icons/action/delete';

import Action from './Action';

const RemoveFromPlaylist = ({ onRemove, ...props }) => (
  <Action {...props} onAction={onRemove}>
    <DeleteIcon color="#fff" />
  </Action>
);

RemoveFromPlaylist.propTypes = {
  onRemove: PropTypes.func.isRequired
};

export default RemoveFromPlaylist;
