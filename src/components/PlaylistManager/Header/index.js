import cx from 'classnames';
import * as React from 'react';
import { translate } from 'react-i18next';
import OverlayHeader from '../../Overlay/Header';
import SearchBar from './SearchBar';

const PlaylistManagerHeader = ({
  t,
  className,
  searchSource,
  onCloseOverlay,
  onSearchSubmit,
  onSearchSourceChange
}) => (
  <OverlayHeader
    className={cx('PlaylistHeader', className)}
    title={t('playlists.title')}
    onCloseOverlay={onCloseOverlay}
  >
    <SearchBar
      className="PlaylistHeader-search"
      source={searchSource}
      onSubmit={onSearchSubmit}
      onSourceChange={onSearchSourceChange}
    />
  </OverlayHeader>
);

PlaylistManagerHeader.propTypes = {
  className: React.PropTypes.string,
  searchSource: React.PropTypes.string.isRequired,
  t: React.PropTypes.func.isRequired,
  onCloseOverlay: React.PropTypes.func.isRequired,
  onSearchSubmit: React.PropTypes.func.isRequired,
  onSearchSourceChange: React.PropTypes.func.isRequired
};

export default translate()(PlaylistManagerHeader);
