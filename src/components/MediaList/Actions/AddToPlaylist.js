import React from 'react';
import AddIcon from 'material-ui/lib/svg-icons/content/add';

import Action from './Action';

const AddToPlaylist = ({ onAdd, ...props }) => {
  const selectedPlaylist = { _id: 'testPlaylistId' };
  // TODO open AddingMenu
  return (
    <Action
      {...props}
      onAction={(...args) => onAdd(selectedPlaylist, ...args)}
    >
      <AddIcon color="#fff" />
    </Action>
  );
};

export default AddToPlaylist;
