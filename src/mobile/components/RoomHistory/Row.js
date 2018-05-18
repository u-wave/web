import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Votes from './Votes';

const wrapTitle = title => (
  <span className="MobileMediaRow-title">
    {title}
  </span>
);

const HistoryRow = ({ media }) => (
  <ListItem className="MobileMediaRow">
    <ListItemAvatar>
      <Avatar
        src={media.media.thumbnail}
        style={{ borderRadius: 0 }}
      />
    </ListItemAvatar>
    <ListItemText
      primary={wrapTitle(media.media.title)}
      secondary={media.media.artist}
    />
    <Votes {...media.stats} />
  </ListItem>
);

HistoryRow.propTypes = {
  media: PropTypes.object,
};

export default HistoryRow;
