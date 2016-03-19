import React from 'react';
import EditIcon from 'material-ui/lib/svg-icons/editor/mode-edit';
import muiThemeable from 'material-ui/lib/muiThemeable';

import Action from './Action';

const EditMedia = ({ onEdit, muiTheme, ...props }) => {
  return (
    <Action {...props} onAction={onEdit}>
      <EditIcon color={muiTheme.rawTheme.palette.textColor} />
    </Action>
  );
};

export default muiThemeable(EditMedia);
