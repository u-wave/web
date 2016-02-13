import cx from 'classnames';
import React from 'react';

import Overlay from '../Overlay';
import OverlayHeader from '../Overlay/Header';

import HistoryList from './HistoryList';

const RoomHistory = ({ className, onCloseOverlay, onOpenAddMediaMenu, ...props }) => {
  return (
    <Overlay
      className={cx('RoomHistory', 'AppColumn', 'AppColumn--full', className)}
      direction="top"
    >
      <OverlayHeader
        direction="top"
        className="AppRow AppRow--top"
        title="History"
        onCloseOverlay={onCloseOverlay}
      />
      <div className="RoomHistory-body AppRow AppRow--middle">
        <HistoryList
          onOpenAddMediaMenu={onOpenAddMediaMenu}
          {...props}
        />
      </div>
    </Overlay>
  );
};

export default RoomHistory;
