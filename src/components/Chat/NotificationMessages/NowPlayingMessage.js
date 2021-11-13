import React from 'react';
import PropTypes from 'prop-types';
import Divider from '@mui/material/Divider';
import MessageTimestamp from '../MessageTimestamp';

function NowPlayingMessage({ entry, timestamp }) {
  return (
    <div className="NowPlayingMessage">
      <Divider>
        {entry.artist} – {entry.title}
      </Divider>
      <div className="NowPlayingMessage-time">
        <MessageTimestamp date={new Date(timestamp)} />
      </div>
    </div>
  );
}

NowPlayingMessage.propTypes = {
  entry: PropTypes.object.isRequired,
  timestamp: PropTypes.number.isRequired,
};

export default NowPlayingMessage;
