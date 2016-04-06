import * as React from 'react';
import PlaylistIcon from 'material-ui/lib/svg-icons/av/playlist-play';

import ImportSourceForm from '../ImportSourceForm';
import FormGroup from '../../../Form/Group';
import TextField from '../../../Form/TextField';
import Button from '../../../Form/Button';

export default class YoutubeImport extends React.Component {
  handleImport = e => {
    e.preventDefault();
    const url = this.refs.url.value;
    console.log(url);
  };

  render() {
    return (
      <ImportSourceForm
        title="YouTube"
        sourceType="youtube"
        onImport={this.handleImport}
      >
        <FormGroup>
          <TextField
            ref="url"
            placeholder="Playlist URL"
            icon={<PlaylistIcon color="#9f9d9e" />}
          />
        </FormGroup>
        <FormGroup>
          <Button>Import</Button>
        </FormGroup>
      </ImportSourceForm>
    );
  }
}
