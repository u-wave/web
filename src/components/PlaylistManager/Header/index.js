import cx from 'classnames';
import * as React from 'react';
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
  className: React.PropTypes.string,
  t: React.PropTypes.func.isRequired,
  onCloseOverlay: React.PropTypes.func.isRequired
};

export default enhance(PlaylistManagerHeader);
