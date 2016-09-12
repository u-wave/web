import cx from 'classnames';
import React, { Component, PropTypes } from 'react';
import Dialog from 'material-ui/Dialog';
import uniqueId from 'lodash/uniqueId';

import ArtistIcon from 'material-ui/svg-icons/hardware/headset';
import TitleIcon from 'material-ui/svg-icons/image/music-note';
import StartIcon from 'material-ui/svg-icons/av/play-arrow';
import EndIcon from 'material-ui/svg-icons/av/stop';

import formatDuration from '../../../utils/formatDuration';

import Form from '../../Form';
import FormGroup from '../../Form/Group';
import Button from '../../Form/Button';
import TextField from '../../Form/TextField';

// naive HH:mm:ss → seconds
const parseDuration = str => str.split(':')
  .map(part => parseInt(part.trim(), 10))
  .reduce((duration, part) => (duration * 60) + part, 0);

export default class EditMediaDialog extends Component {
  static propTypes = {
    open: PropTypes.bool,
    media: PropTypes.object,

    bodyClassName: PropTypes.string,
    contentClassName: PropTypes.string,
    titleClassName: PropTypes.string,

    onEditedMedia: PropTypes.func.isRequired,
    onCloseDialog: PropTypes.func.isRequired
  };

  state = {
    errors: null
  };

  labelStart = uniqueId('editmedia');
  labelEnd = uniqueId('editmedia');

  handleSubmit = (e) => {
    e.preventDefault();

    const { media, onEditedMedia, onCloseDialog } = this.props;
    const { artist, title, start, end } = this;

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
      this.setState({ errors });
      return;
    }

    onEditedMedia({
      artist: artist.value,
      title: title.value,
      start: startSeconds,
      end: endSeconds
    });
    onCloseDialog();
  };

  refArtist = (artist) => {
    this.artist = artist;
  };

  refTitle = (title) => {
    this.title = title;
  };

  refStart = (start) => {
    this.start = start;
  };

  refEnd = (end) => {
    this.end = end;
  };

  render() {
    const {
      open,
      media,
      onCloseDialog,

      bodyClassName,
      contentClassName,
      titleClassName,

      ...props
    } = this.props;
    const { errors } = this.state;
    const baseTabIndex = 1000;
    let content = null;
    if (open) {
      const artistInput = (
        <TextField
          ref={this.refArtist}
          className="EditMediaDialogGroup-field"
          placeholder="Artist"
          defaultValue={media.artist}
          icon={<ArtistIcon color="#9f9d9e" />}
          tabIndex={baseTabIndex}
          autofocus
        />
      );
      const artistTitleLabel = (
        <div className="EditMediaDialogGroup-label">–</div>
      );
      const titleInput = (
        <TextField
          ref={this.refTitle}
          className="EditMediaDialogGroup-field"
          placeholder="Title"
          defaultValue={media.title}
          icon={<TitleIcon color="#9f9d9e" />}
          tabIndex={baseTabIndex + 1}
        />
      );

      const fromLabel = (
        <label htmlFor={this.labelStart} className="EditMediaDialogGroup-label">Play from:</label>
      );
      const fromInput = (
        <TextField
          ref={this.refStart}
          id={this.labelStart}
          className="EditMediaDialogGroup-field"
          placeholder="0:00"
          defaultValue={formatDuration(media.start)}
          icon={<StartIcon color="#9f9d9e" />}
          tabIndex={baseTabIndex + 2}
        />
      );
      const toLabel = (
        <label htmlFor={this.labelEnd} className="EditMediaDialogGroup-label">to:</label>
      );
      const toInput = (
        <TextField
          ref={this.refEnd}
          id={this.labelEnd}
          className="EditMediaDialogGroup-field"
          placeholder={formatDuration(media.duration)}
          defaultValue={formatDuration(media.end)}
          icon={<EndIcon color="#9f9d9e" />}
          tabIndex={baseTabIndex + 3}
        />
      );

      content = (
        <Form className="EditMediaDialog" onSubmit={this.handleSubmit}>
          {errors && errors.length > 0 && (
            <FormGroup>
              {errors.map(error => <div>{error}</div>)}
            </FormGroup>
          )}

          <div className="EditMediaDialogForm">
            <div className="EditMediaDialogForm-column">
              <FormGroup className="EditMediaDialogGroup">
                {artistInput}
              </FormGroup>
              <FormGroup className="EditMediaDialogGroup">
                {fromLabel}
                {fromInput}
              </FormGroup>
            </div>
            <div className="EditMediaDialogForm-separator">
              <FormGroup className="EditMediaDialogGroup">
                {artistTitleLabel}
              </FormGroup>
              <FormGroup className="EditMediaDialogGroup">
                {toLabel}
              </FormGroup>
            </div>
            <div className="EditMediaDialogForm-column">
              <FormGroup className="EditMediaDialogGroup">
                {titleInput}
              </FormGroup>
              <FormGroup className="EditMediaDialogGroup">
                {toInput}
              </FormGroup>
            </div>
          </div>

          <FormGroup className="FormGroup--noSpacing">
            <Button className="EditMediaDialog-submit">
              Save
            </Button>
          </FormGroup>
        </Form>
      );
    }
    return (
      <Dialog
        {...props}
        contentClassName={cx('Dialog', contentClassName)}
        bodyClassName={cx('Dialog-body', bodyClassName)}
        titleClassName={cx('Dialog-title', titleClassName)}
        title="Edit Media"
        open={open}
        onRequestClose={onCloseDialog}
      >
        {content}
      </Dialog>
    );
  }
}
