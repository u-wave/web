import React from 'react';
import MediaListBase from '../MediaList/BaseMediaList';
import HistoryRow from './Row';

function HistoryList(props) {
  return (
    <MediaListBase
      className="RoomHistory-list"
      listComponent="div"
      rowComponent={HistoryRow}
      {...props}
    />
  );
}

export default HistoryList;
