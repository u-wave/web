import React from 'react';
import PropTypes from 'prop-types';
import { ListItem, ListItemText } from 'material-ui-next/List'; // eslint-disable-line

const MediaRow = ({ media }) => (
  <ListItem>
    <ListItemText
      primary={media.title}
      secondary={media.artist}
    />
  </ListItem>
);

MediaRow.propTypes = {
  media: PropTypes.object.isRequired,
};

export default MediaRow;
