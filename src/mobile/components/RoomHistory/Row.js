import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Votes from './Votes';

const noWrap = { noWrap: true };

const HistoryRow = ({ media, style }) => (
  <ListItem className="MobileMediaRow" style={style}>
    <ListItemAvatar>
      <Avatar
        src={media.media.thumbnail}
        variant="square"
      />
    </ListItemAvatar>
    <ListItemText
      primaryTypographyProps={noWrap}
      secondaryTypographyProps={noWrap}
      primary={media.media.title}
      secondary={media.media.artist}
    />
    <Votes {...media.stats} />
  </ListItem>
);

HistoryRow.propTypes = {
  style: PropTypes.object, // from react-window
  media: PropTypes.object,
};

export default HistoryRow;
