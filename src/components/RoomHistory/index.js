import cx from 'classnames';
import React from 'react';

import OverlayHeader from '../Overlay/Header';
import MediaList from '../MediaList';
import AddToPlaylistAction from '../MediaList/Actions/AddToPlaylist';

const RoomHistory = ({ className, onCloseOverlay, onOpenAddMediaMenu, ...props }) => {
  return (
    <div className={cx('RoomHistory', 'AppColumn', 'AppColumn--full', className)}>
      <OverlayHeader
        className="AppRow AppRow--top"
        title="History"
        onCloseOverlay={onCloseOverlay}
      />
      <div className="RoomHistory-body AppRow AppRow--middle">
        <MediaList
          {...props}
          className="RoomHistory-list"
          makeActions={(media, selection) => [
            <AddToPlaylistAction
              key="add"
              onAdd={position => onOpenAddMediaMenu(position, media, selection)}
            />
          ]}
        />
      </div>
    </div>
  );
};

export default RoomHistory;
