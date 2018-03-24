import React from 'react';
import PropTypes from 'prop-types';
import Avatar from 'material-ui/Avatar';
import { ListItem } from 'material-ui/List';
import Votes from './Votes';

const wrapTitle = title => (
  <div className="MobileMediaRow-title">
    {title}
  </div>
);

const HistoryRow = ({ media }) => (
  <ListItem
    className="MobileMediaRow"
    primaryText={wrapTitle(media.media.title)}
    secondaryText={
      // This has a wrapper div so we can override the material-ui styling using
      // the `.MoblieMediaRow-artist` CSS class.
      <div>
        <div className="MobileMediaRow-artist">
          {media.media.artist}
          <Votes {...media.stats} />
        </div>
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
  media: PropTypes.object,
};

export default HistoryRow;
