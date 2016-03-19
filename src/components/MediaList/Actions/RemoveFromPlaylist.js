import React from 'react';
import DeleteIcon from 'material-ui/lib/svg-icons/action/delete';
import muiThemeable from 'material-ui/lib/muiThemeable';

import Action from './Action';

const RemoveFromPlaylist = ({ onRemove, muiTheme, ...props }) => {
  return (
    <Action {...props} onAction={onRemove}>
      <DeleteIcon color={muiTheme.rawTheme.palette.textColor} />
    </Action>
  );
};

export default muiThemeable(RemoveFromPlaylist);
