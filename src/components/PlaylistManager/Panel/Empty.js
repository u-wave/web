import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';

const EmptyPanel = ({ t, className }) => (
  <div className={cx('PlaylistPanel', 'PlaylistPanel--empty', className)}>
    {t('playlists.noPlaylists')}
  </div>
);

EmptyPanel.propTypes = {
  t: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default translate()(EmptyPanel);
