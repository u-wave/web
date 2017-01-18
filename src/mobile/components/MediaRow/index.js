import * as React from 'react';
import { ListItem } from 'material-ui/List';

const MediaRow = ({ media }) => (
  <ListItem
    primaryText={media.title}
    secondaryText={media.artist}
  />
);

MediaRow.propTypes = {
  media: React.PropTypes.object.isRequired
};

export default MediaRow;
