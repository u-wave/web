import * as React from 'react';
import PlaylistIcon from 'material-ui/lib/svg-icons/av/playlist-play';

import ImportSourceForm from '../ImportSourceForm';
import FormGroup from '../../../Form/Group';
import TextField from '../../../Form/TextField';
import Button from '../../../Form/Button';

import {
  getChannelPlaylists,
  getImportablePlaylist
} from './actions';

export default class YoutubeImportForm extends React.Component {
  static propTypes = {
    onShowImportPanel: React.PropTypes.func.isRequired
  };

  static contextTypes = {
    store: React.PropTypes.object
  };

  dispatch(action) {
    this.context.store.dispatch(action);
  }

  handleImportChannel = e => {
    e.preventDefault();
    const url = this.refs.channel.value;
    this.dispatch(getChannelPlaylists(url));
    this.props.onShowImportPanel();
  };

  handleImportPlaylist = e => {
    e.preventDefault();
    const url = this.refs.playlist.value;

    this.dispatch(getImportablePlaylist(url));
    this.props.onShowImportPanel();
  };

  handleSubmit = e => {
    e.preventDefault();
  };

  render() {
    return (
      <ImportSourceForm
        title="YouTube"
        sourceType="youtube"
        onImport={this.handleSubmit}
      >
        <FormGroup>
          <TextField
            ref="channel"
            placeholder="Channel URL"
            icon={<PlaylistIcon color="#9f9d9e" />}
          />
        </FormGroup>
        <FormGroup>
          <Button onClick={this.handleImportChannel}>
            Import From Channel
          </Button>
        </FormGroup>
        <FormGroup>
          <TextField
            ref="playlist"
            placeholder="Playlist URL"
            icon={<PlaylistIcon color="#9f9d9e" />}
          />
        </FormGroup>
        <FormGroup>
          <Button onClick={this.handleImportPlaylist}>
            Import Playlist
          </Button>
        </FormGroup>
      </ImportSourceForm>
    );
  }
}
