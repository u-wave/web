import React from 'react';
import List from '@mui/material/List';
import Base from '../../../components/MediaList/BaseMediaList';
import MediaRow from './Row';

function MediaList(props) {
  return (
    <Base
      listComponent={List}
      rowComponent={MediaRow}
      {...props}
    />
  );
}

export default MediaList;
