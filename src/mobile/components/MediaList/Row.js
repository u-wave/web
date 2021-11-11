import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';

const noWrap = { noWrap: true };

const MediaRow = ({ media, style }) => (
  <ListItem className="MobileMediaRow" style={style}>
    <ListItemAvatar>
      <Avatar
        src={media.thumbnail}
        variant="square"
      />
    </ListItemAvatar>
    <ListItemText
      primaryTypographyProps={noWrap}
      secondaryTypographyProps={noWrap}
      primary={media.title}
      secondary={media.artist}
    />
  </ListItem>
);

MediaRow.propTypes = {
  style: PropTypes.object, // from react-window
  media: PropTypes.object,
};

export default MediaRow;
