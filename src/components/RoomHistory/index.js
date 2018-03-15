import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import OverlayHeader from '../Overlay/Header';
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
    <div className="RoomHistory-body AppRow AppRow--middle">
      <HistoryList
        onOpenAddMediaMenu={onOpenAddMediaMenu}
        onOpenPreviewMediaDialog={onOpenPreviewMediaDialog}
        {...props}
      />
    </div>
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
