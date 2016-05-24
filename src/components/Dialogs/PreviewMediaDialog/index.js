/* eslint-disable react/prefer-stateless-function */
import * as React from 'react';
import Dialog from 'material-ui/Dialog';

import PreviewPlayer from '../../Video/Player';

export default class PreviewMediaDialog extends React.Component {
  static propTypes = {
    open: React.PropTypes.bool,
    media: React.PropTypes.object,
    volume: React.PropTypes.volume,

    onCloseDialog: React.PropTypes.func.isRequired
  };

  render() {
    const {
      open,
      media,
      volume,
      onCloseDialog
    } = this.props;

    let content = null;
    if (open) {
      content = (
        <div className="PreviewMediaDialog-content">
          <PreviewPlayer
            mode="preview"
            media={media}
            volume={volume}
          />
        </div>
      );
    }
    return (
      <Dialog
        contentClassName="Dialog PreviewMediaDialog"
        bodyClassName="Dialog-body"
        titleClassName="Dialog-title"
        title={open ? `${media.artist} – ${media.title}` : 'Preview Media'}
        open={open}
        onRequestClose={onCloseDialog}
        autoScrollBodyContent
      >
        {content}
      </Dialog>
    );
  }
}
/* eslint-enable react/prefer-stateless-function */
