import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';

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
