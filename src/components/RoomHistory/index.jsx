import cx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslator } from '@u-wave/react-translate';
import OverlayHeader from '../Overlay/Header';
import OverlayContent from '../Overlay/Content';
import HistoryList from './HistoryList';

function RoomHistory({ className, onCloseOverlay, ...props }) {
  const { t } = useTranslator();

  return (
    <div className={cx('RoomHistory', className)}>
      <OverlayHeader
        direction="top"
        className="AppRow AppRow--top"
        title={t('history.title')}
        onCloseOverlay={onCloseOverlay}
      />
      <OverlayContent className="RoomHistory-body">
        <HistoryList {...props} />
      </OverlayContent>
    </div>
  );
}

RoomHistory.propTypes = {
  className: PropTypes.string,
  onCloseOverlay: PropTypes.func.isRequired,
};

export default RoomHistory;
