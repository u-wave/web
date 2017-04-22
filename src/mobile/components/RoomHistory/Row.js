import React from 'react';
import PropTypes from 'prop-types';
import Avatar from 'material-ui/Avatar';
import { ListItem } from 'material-ui/List';
import Votes from './Votes';

const truncate = (str) => {
  if (str.length < 30) return str;
  return `${str.slice(0, 30)}…`;
};

const HistoryRow = ({ media }) => (
  <ListItem
    primaryText={truncate(media.media.title)}
    secondaryText={
      <div style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
        {truncate(media.media.artist)}
        <Votes {...media.stats} />
      </div>
    }
    leftAvatar={
      <Avatar
        src={media.media.thumbnail}
        style={{ borderRadius: 0 }}
      />
    }
  />
);

HistoryRow.propTypes = {
  media: PropTypes.object
};

export default HistoryRow;
