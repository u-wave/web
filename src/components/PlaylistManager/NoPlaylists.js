import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { translate } from '@u-wave/react-translate';

const enhance = translate();

const NoPlaylists = ({ t, className }) => (
  <div className={cx('PlaylistPanel', 'PlaylistPanel--empty', className)}>
    {t('playlists.noPlaylists')}
  </div>
);

NoPlaylists.propTypes = {
  t: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default enhance(NoPlaylists);
