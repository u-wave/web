import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import EmptyIcon from '@material-ui/icons/PlaylistAdd';

const enhance = translate();

const PlaylistEmpty = ({ t }) => (
  <div className="PlaylistPanel-empty">
    <EmptyIcon className="PlaylistPanel-emptyIcon" />
    <Typography className="PlaylistPanel-emptyHeader">{t('playlists.playlist.empty')}</Typography>
    <Typography>{t('playlists.playlist.emptySub')}</Typography>
  </div>
);

PlaylistEmpty.propTypes = {
  t: PropTypes.func.isRequired,
};

export default enhance(PlaylistEmpty);
