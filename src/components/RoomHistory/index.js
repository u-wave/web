import cx from 'classnames';
import * as React from 'react';
import { translate } from 'react-i18next';

import Overlay from '../Overlay';
import OverlayHeader from '../Overlay/Header';

import HistoryList from './HistoryList';

const RoomHistory = ({
  t,
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
      title={t('history.title')}
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
  t: React.PropTypes.func.isRequired,
  className: React.PropTypes.string,
  onCloseOverlay: React.PropTypes.func.isRequired,
  onOpenAddMediaMenu: React.PropTypes.func.isRequired,
  onOpenPreviewMediaDialog: React.PropTypes.func.isRequired
};

export default translate()(RoomHistory);
