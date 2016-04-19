import * as React from 'react';
import PlaylistIcon from 'material-ui/lib/svg-icons/av/playlist-play';

import ImportSourceBlock from '../../components/PlaylistManager/Import/ImportSourceBlock';
import Form from '../../components/Form';
import FormGroup from '../../components/Form/Group';
import TextField from '../../components/Form/TextField';
import Button from '../../components/Form/Button';

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

  render() {
    return (
      <ImportSourceBlock
        title="YouTube"
        sourceType="youtube"
      >
        <Form onSubmit={this.handleImportChannel}>
          <FormGroup>
            <TextField
              ref="channel"
              placeholder="Channel URL"
              icon={<PlaylistIcon color="#9f9d9e" />}
            />
          </FormGroup>
          <FormGroup>
            <Button>Import From Channel</Button>
          </FormGroup>
        </Form>
        <Form onSubmit={this.handleImportPlaylist}>
          <FormGroup>
            <TextField
              ref="playlist"
              placeholder="Playlist URL"
              icon={<PlaylistIcon color="#9f9d9e" />}
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
