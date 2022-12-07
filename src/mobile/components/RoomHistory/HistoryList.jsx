import React from 'react';
import List from '@mui/material/List';
import Base from '../../../components/MediaList/BaseMediaList';
import HistoryRow from './Row';

function HistoryList(props) {
  return (
    <Base
      className="RoomHistory-list"
      listComponent={List}
      rowComponent={HistoryRow}
      {...props}
    />
  );
}

export default HistoryList;
