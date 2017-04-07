import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import OverlayHeader from '../../Overlay/Header';
import SearchBar from '../../../containers/MediaSearchBar';

const enhance = translate();

const PlaylistManagerHeader = ({
  t,
  className,
  onCloseOverlay
}) => (
  <OverlayHeader
    className={cx('PlaylistHeader', className)}
    title={t('playlists.title')}
    onCloseOverlay={onCloseOverlay}
  >
    <SearchBar className="PlaylistHeader-search" />
  </OverlayHeader>
);

PlaylistManagerHeader.propTypes = {
  className: PropTypes.string,
  t: PropTypes.func.isRequired,
  onCloseOverlay: PropTypes.func.isRequired
};

export default enhance(PlaylistManagerHeader);
