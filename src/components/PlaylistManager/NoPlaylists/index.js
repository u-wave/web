import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslator } from '@u-wave/react-translate';
import Typography from '@material-ui/core/Typography';
import PlaylistIcon from '@material-ui/icons/PlaylistAdd';
import Form from '../../Form';
import FormGroup from '../../Form/Group';
import Button from '../../Form/Button';
import ImportBlock from './ImportBlock';

const { useCallback } = React;

function NoPlaylists({ className, onCreatePlaylist }) {
  const { t } = useTranslator();
  const handleCreatePlaylist = useCallback((event) => {
    event.preventDefault();
    return onCreatePlaylist();
  }, [onCreatePlaylist]);

  return (
    <div className={cx('PlaylistPanel', 'PlaylistPanel--empty', className)}>
      <Typography className="NoPlaylists-header">{t('playlists.noPlaylists')}</Typography>
      <Typography>{t('playlists.noPlaylistsSub')}</Typography>

      <div className="NoPlaylists-create">
        <Form
          className="NoPlaylists-block"
          onSubmit={handleCreatePlaylist}
        >
          <FormGroup>
            <PlaylistIcon className="NoPlaylists-icon" />
          </FormGroup>
          <FormGroup>
            <Button>{t('playlists.new')}</Button>
          </FormGroup>
        </Form>
        <ImportBlock />
      </div>
    </div>
  );
}

NoPlaylists.propTypes = {
  className: PropTypes.string,
  onCreatePlaylist: PropTypes.func.isRequired,
};

export default NoPlaylists;
