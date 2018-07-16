import React from 'react';
import PropTypes from 'prop-types';
import PlaylistIcon from '@material-ui/icons/PlaylistPlay';
import ImportSourceBlock from '../../components/PlaylistManager/Import/ImportSourceBlock';
import Form from '../../components/Form';
import FormGroup from '../../components/Form/Group';
import TextField from '../../components/Form/TextField';
import Button from '../../components/Form/Button';

import {
  getChannelPlaylists,
  getImportablePlaylist,
} from './actions';

export default class YoutubeImportForm extends React.Component {
  static propTypes = {
    onShowImportPanel: PropTypes.func.isRequired,
    onHideImportPanel: PropTypes.func.isRequired,
  };

  static contextTypes = {
    store: PropTypes.object,
  };

  handleImportChannel = (e) => {
    const { onHideImportPanel, onShowImportPanel } = this.props;

    e.preventDefault();
    const url = this.channel.value;
    this.dispatch(getChannelPlaylists(url)).catch(() => {
      onHideImportPanel();
    });
    onShowImportPanel();
  };

  handleImportPlaylist = (e) => {
    const { onHideImportPanel, onShowImportPanel } = this.props;

    e.preventDefault();
    const url = this.playlist.value;

    this.dispatch(getImportablePlaylist(url)).catch(() => {
      onHideImportPanel();
    });
    onShowImportPanel();
  };

  refChannel = (channel) => {
    this.channel = channel;
  };

  refPlaylist = (playlist) => {
    this.playlist = playlist;
  };

  dispatch(action) {
    const { store } = this.context;
    return store.dispatch(action);
  }

  render() {
    return (
      <ImportSourceBlock
        title="YouTube"
        sourceType="youtube"
      >
        <Form onSubmit={this.handleImportChannel}>
          <FormGroup>
            <TextField
              ref={this.refChannel}
              placeholder="Channel URL"
              icon={<PlaylistIcon nativeColor="#9f9d9e" />}
            />
          </FormGroup>
          <FormGroup>
            <Button>Import From Channel</Button>
          </FormGroup>
        </Form>
        <Form onSubmit={this.handleImportPlaylist}>
          <FormGroup>
            <TextField
              ref={this.refPlaylist}
              placeholder="Playlist URL"
              icon={<PlaylistIcon nativeColor="#9f9d9e" />}
            />
          </FormGroup>
          <FormGroup>
            <Button>Import Playlist</Button>
          </FormGroup>
        </Form>
      </ImportSourceBlock>
    );
  }
}
