import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';

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
