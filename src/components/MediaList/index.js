import React from 'react';
import Base from './BaseMediaList';
import Row from './Row';

function MediaList(props) {
  return (
    <Base
      listComponent="div"
      rowComponent={Row}
      {...props}
    />
  );
}

export default MediaList;
