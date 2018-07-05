import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslator } from 'react-i18next';
import PlaylistIcon from '@material-ui/icons/PlaylistAdd';
import Button from '../../Form/Button';
import ImportBlock from './ImportBlock';

function NoPlaylists({ className }) {
  const { t } = useTranslator();

  return (
    <div className={cx('PlaylistPanel', 'PlaylistPanel--empty', className)}>
      {t('playlists.noPlaylists')}

      <div className="PlaylistPanel-create">
        <div className="PlaylistPanel-button">
          <PlaylistIcon
            className="PlaylistPanel-emptyIcon"
            style={{ width: 200, height: 200 }}
          />
          <Button>{t('dialogs.createPlaylist.action')}</Button>
        </div>
        <ImportBlock />
      </div>
    </div>
  );
}

NoPlaylists.propTypes = {
  className: PropTypes.string,
};

export default NoPlaylists;
