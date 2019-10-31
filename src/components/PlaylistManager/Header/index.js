import cx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslator } from '@u-wave/react-translate';
import OverlayHeader from '../../Overlay/Header';

function PlaylistManagerHeader({
  className,
  children,
  onCloseOverlay,
}) {
  const { t } = useTranslator();

  return (
    <OverlayHeader
      className={cx('PlaylistHeader', className)}
      title={t('playlists.title')}
      onCloseOverlay={onCloseOverlay}
    >
      {children}
    </OverlayHeader>
  );
}

PlaylistManagerHeader.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  onCloseOverlay: PropTypes.func.isRequired,
};

export default PlaylistManagerHeader;
