import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import Overlay from '../../../components/Overlay';
import OverlayHeader from '../../../components/Overlay/Header';
import OverlayContent from '../../../components/Overlay/Content';
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
    <OverlayContent className="RoomHistory-body">
      <HistoryList
        onOpenAddMediaMenu={onOpenAddMediaMenu}
        onOpenPreviewMediaDialog={onOpenPreviewMediaDialog}
        {...props}
      />
    </OverlayContent>
  </Overlay>
);

RoomHistory.propTypes = {
  t: PropTypes.func.isRequired,
  className: PropTypes.string,
  onCloseOverlay: PropTypes.func.isRequired,
  onOpenAddMediaMenu: PropTypes.func.isRequired,
  onOpenPreviewMediaDialog: PropTypes.func.isRequired
};

export default translate()(RoomHistory);
