import cx from 'classnames';
import * as React from 'react';

import Overlay from '../Overlay';
import OverlayHeader from '../Overlay/Header';

import HistoryList from './HistoryList';

const RoomHistory = ({
  className,
  onCloseOverlay,
  onOpenAddMediaMenu,
  onOpenPreviewMediaDialog,
  ...props
}) => (
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
        onOpenPreviewMediaDialog={onOpenPreviewMediaDialog}
        {...props}
      />
    </div>
  </Overlay>
);

RoomHistory.propTypes = {
  className: React.PropTypes.string,
  onCloseOverlay: React.PropTypes.func.isRequired,
  onOpenAddMediaMenu: React.PropTypes.func.isRequired,
  onOpenPreviewMediaDialog: React.PropTypes.func.isRequired
};

export default RoomHistory;
