import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { translate } from '@u-wave/react-translate';
import OverlayHeader from '../../Overlay/Header';

const enhance = translate();

const PlaylistManagerHeader = ({
  t,
  className,
  children,
  onCloseOverlay,
}) => (
  <OverlayHeader
    className={cx('PlaylistHeader', className)}
    title={t('playlists.title')}
    onCloseOverlay={onCloseOverlay}
  >
    {children}
  </OverlayHeader>
);

PlaylistManagerHeader.propTypes = {
  t: PropTypes.func.isRequired,
  className: PropTypes.string,
  children: PropTypes.node,
  onCloseOverlay: PropTypes.func.isRequired,
};

export default enhance(PlaylistManagerHeader);
