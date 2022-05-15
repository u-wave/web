import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
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
  style: PropTypes.object, // from virtual list positioning
  media: PropTypes.object,
};

export default HistoryRow;
