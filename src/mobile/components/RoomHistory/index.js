import cx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { translate } from '@u-wave/react-translate';
import OverlayHeader from '../../../components/Overlay/Header';
import OverlayContent from '../../../components/Overlay/Content';
import HistoryList from './HistoryList';

const enhance = translate();

const RoomHistory = ({
  t,
  className,
  onCloseOverlay,
  onOpenAddMediaMenu,
  onOpenPreviewMediaDialog,
  ...props
}) => (
  <div className={cx('RoomHistory', className)}>
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
  </div>
);

RoomHistory.propTypes = {
  t: PropTypes.func.isRequired,
  className: PropTypes.string,
  onCloseOverlay: PropTypes.func.isRequired,
  onOpenAddMediaMenu: PropTypes.func.isRequired,
  onOpenPreviewMediaDialog: PropTypes.func.isRequired,
};

export default enhance(RoomHistory);
