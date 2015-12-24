import React, { Component, PropTypes } from 'react';
import Dialog from 'material-ui/lib/dialog';

import ArtistIcon from 'material-ui/lib/svg-icons/hardware/headset';
import TitleIcon from 'material-ui/lib/svg-icons/image/music-note';
import StartIcon from 'material-ui/lib/svg-icons/av/play-arrow';
import EndIcon from 'material-ui/lib/svg-icons/av/stop';

import formatDuration from '../../../utils/formatDuration';

import Form from '../../Form';
import FormGroup from '../../Form/Group';
import Button from '../../Form/Button';
import TextField from '../../Form/TextField';

// naive HH:mm:ss → seconds
const parseDuration = str => str.split(':')
  .map(part => parseInt(part.trim(), 10))
  .reduce((duration, part) => duration * 60 + part, 0);

export default class EditDialog extends Component {
  static propTypes = {
    open: PropTypes.boolean,
    media: PropTypes.object,

    onEditedMedia: PropTypes.func.isRequired,
    onCloseDialog: PropTypes.func.isRequired
  };

  state = {
    errors: null
  };

  handleSubmit(e) {
    e.preventDefault();

    const { media, onEditedMedia, onCloseDialog } = this.props;
    const { artist, title, start, end } = this.refs;

    const startSeconds = parseDuration(start.value);
    const endSeconds = parseDuration(end.value);

    const errors = [];
    if (isNaN(startSeconds) || startSeconds < 0) {
      errors.push('That start time is invalid.');
    }
    if (isNaN(endSeconds) || endSeconds < 0) {
      errors.push('That end time is invalid.');
    } else if (endSeconds < startSeconds) {
      errors.push('The end time should be after the start time.');
    } else if (endSeconds > media.duration) {
      errors.push('The end time cannot be past the total duration of the song.');
    }

    if (errors.length > 0) {
      return this.setState({ errors: errors });
    }

    onEditedMedia({
      artist: artist.value,
      title: title.value,
      start: startSeconds,
      end: endSeconds
    });
    onCloseDialog();
  }

  render() {
    const { open, media } = this.props;
    const { errors } = this.state;
    let content = null;
    if (open) {
      content = (
        <Form className="EditMediaDialog" onSubmit={::this.handleSubmit}>
          <h1 className="Dialog-header">Edit Media</h1>

          {errors && errors.length > 0 && (
            <FormGroup>
              {errors.map(error => <div>{error}</div>)}
            </FormGroup>
          )}

          <FormGroup className="EditMediaDialogGroup">
            <TextField
              ref="artist"
              className="EditMediaDialogGroup-field"
              placeholder="Artist"
              defaultValue={media.artist}
              icon={<ArtistIcon color="#9f9d9e"/>}
              autofocus
            />
            <label className="EditMediaDialogGroup-label">–</label>
            <TextField
              ref="title"
              className="EditMediaDialogGroup-field"
              placeholder="Title"
              defaultValue={media.title}
              icon={<TitleIcon color="#9f9d9e"/>}
            />
          </FormGroup>

          <FormGroup className="EditMediaDialogGroup EditMediaDialogGroup--timings">
            <label className="EditMediaDialogGroup-label">Play from:</label>
            <TextField
              ref="start"
              className="EditMediaDialogGroup-field"
              placeholder="Artist"
              defaultValue={formatDuration(media.start)}
              icon={<StartIcon color="#9f9d9e"/>}
              autofocus
            />
            <label className="EditMediaDialogGroup-label">to:</label>
            <TextField
              ref="end"
              className="EditMediaDialogGroup-field"
              placeholder="Title"
              defaultValue={formatDuration(media.end)}
              icon={<EndIcon color="#9f9d9e"/>}
            />
          </FormGroup>

          <FormGroup>
            <Button className="EditMediaDialog-submit">
              Save
            </Button>
          </FormGroup>
        </Form>
      );
    }
    return (
      <Dialog className="Dialog" open={open}>
        {content}
      </Dialog>
    );
  }
}
