import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useTranslator } from '@u-wave/react-translate';
import PlaylistIcon from '@mui/icons-material/PlaylistPlay';
import ImportSourceBlock from '../../components/PlaylistManager/Import/ImportSourceBlock';
import Form from '../../components/Form';
import FormGroup from '../../components/Form/Group';
import TextField from '../../components/Form/TextField';
import Button from '../../components/Form/Button';
import {
  getChannelPlaylists,
  getImportablePlaylist,
} from './actions';

const {
  useRef,
} = React;

function YoutubeImportForm({
  onHideImportPanel,
  onShowImportPanel,
}) {
  const { t } = useTranslator();
  const dispatch = useDispatch();

  const refChannel = useRef(null);
  const refPlaylist = useRef(null);

  const handleImportChannel = (event) => {
    event.preventDefault();
    const url = refChannel.current.value;
    dispatch(getChannelPlaylists(url)).catch(() => {
      onHideImportPanel();
    });
    onShowImportPanel();
  };

  const handleImportPlaylist = (event) => {
    event.preventDefault();
    const url = refPlaylist.current.value;

    dispatch(getImportablePlaylist(url)).catch(() => {
      onHideImportPanel();
    });
    onShowImportPanel();
  };

  return (
    <ImportSourceBlock
      title={t('youtube.name')}
      sourceType="youtube"
    >
      <Form onSubmit={handleImportChannel}>
        <FormGroup>
          <TextField
            ref={refChannel}
            placeholder={t('youtube.channelUrl')}
            icon={<PlaylistIcon htmlColor="#9f9d9e" />}
          />
        </FormGroup>
        <FormGroup>
          <Button>{t('youtube.importChannel')}</Button>
        </FormGroup>
      </Form>
      <Form onSubmit={handleImportPlaylist}>
        <FormGroup>
          <TextField
            ref={refPlaylist}
            placeholder={t('youtube.playlistUrl')}
            icon={<PlaylistIcon htmlColor="#9f9d9e" />}
          />
        </FormGroup>
        <FormGroup>
          <Button>{t('youtube.importPlaylist')}</Button>
        </FormGroup>
      </Form>
    </ImportSourceBlock>
  );
}

YoutubeImportForm.propTypes = {
  onShowImportPanel: PropTypes.func.isRequired,
  onHideImportPanel: PropTypes.func.isRequired,
};

export default YoutubeImportForm;
