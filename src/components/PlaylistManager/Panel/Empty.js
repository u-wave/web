import cx from 'classnames';
import * as React from 'react';
import { translate } from 'react-i18next';

const EmptyPanel = ({ t, className }) => (
  <div className={cx('PlaylistPanel', 'PlaylistPanel--empty', className)}>
    {t('playlists.noPlaylists')}
  </div>
);

EmptyPanel.propTypes = {
  t: React.PropTypes.func.isRequired,
  className: React.PropTypes.string
};

export default translate()(EmptyPanel);
