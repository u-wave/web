import React from 'react';
import PropTypes from 'prop-types';
import { ListItem } from 'material-ui/List';

const MediaRow = ({ media }) => (
  <ListItem
    primaryText={media.title}
    secondaryText={media.artist}
  />
);

MediaRow.propTypes = {
  media: PropTypes.object.isRequired,
};

export default MediaRow;
