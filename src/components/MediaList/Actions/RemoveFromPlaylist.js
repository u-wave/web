import React from 'react';
import DeleteIcon from 'material-ui/lib/svg-icons/action/delete';

import Action from './Action';

const RemoveFromPlaylist = ({ onRemove, ...props }) => {
  return (
    <Action {...props} onAction={onRemove}>
      <DeleteIcon color="#fff" />
    </Action>
  );
};

export default RemoveFromPlaylist;
