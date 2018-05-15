import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const MediaRow = ({ media }) => (
  <ListItem className="MobileMediaRow">
    <Avatar
      src={media.thumbnail}
      style={{ borderRadius: 0 }}
    />
    <ListItemText
      primary={media.title}
      secondary={media.artist}
    />
  </ListItem>
);

MediaRow.propTypes = {
  media: PropTypes.object,
};

export default MediaRow;
