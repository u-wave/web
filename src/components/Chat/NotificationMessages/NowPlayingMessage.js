import React from 'react';
import PropTypes from 'prop-types';
import MessageTimestamp from '../MessageTimestamp';

const NowPlayingMessage = ({ entry, timestamp }) => (
  <div
    className="NowPlayingMessage"
  >
    <div className="NowPlayingMessage-mediaWrap">
      <span className="NowPlayingMessage-media">
        {entry.artist} – {entry.title}
      </span>
    </div>
    <div className="NowPlayingMessage-time">
      <MessageTimestamp date={new Date(timestamp)} />
    </div>
  </div>
);

NowPlayingMessage.propTypes = {
  entry: PropTypes.object.isRequired,
  timestamp: PropTypes.number.isRequired,
};

export default NowPlayingMessage;
