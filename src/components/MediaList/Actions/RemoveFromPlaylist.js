import * as React from 'react';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import muiThemeable from 'material-ui/styles/muiThemeable';

import Action from './Action';

const RemoveFromPlaylist = ({ onRemove, muiTheme, ...props }) => (
  <Action {...props} onAction={onRemove}>
    <DeleteIcon color={muiTheme.palette.textColor} />
  </Action>
);

RemoveFromPlaylist.propTypes = {
  onRemove: React.PropTypes.func.isRequired,
  muiTheme: React.PropTypes.object.isRequired
};

export default muiThemeable()(RemoveFromPlaylist);
