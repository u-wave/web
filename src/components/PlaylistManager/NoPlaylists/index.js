import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslator } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import PlaylistIcon from '@material-ui/icons/PlaylistAdd';
import Button from '../../Form/Button';
import ImportBlock from './ImportBlock';

function NoPlaylists({ className }) {
  const { t } = useTranslator();

  return (
    <div className={cx('PlaylistPanel', 'PlaylistPanel--empty', className)}>
      <Typography className="NoPlaylists-header">{t('playlists.noPlaylists')}</Typography>
      <Typography>{t('playlists.noPlaylistsSub')}</Typography>

      <div className="NoPlaylists-create">
        <div className="NoPlaylists-block">
          <PlaylistIcon className="NoPlaylists-icon" />
          <Button>{t('playlists.new')}</Button>
        </div>
      </div>
    </div>
  );
}

NoPlaylists.propTypes = {
  className: PropTypes.string,
};

export default NoPlaylists;
