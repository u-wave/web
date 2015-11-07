import cx from 'classnames';
import React from 'react';
import AddIcon from 'material-ui/lib/svg-icons/content/add';
import EditIcon from 'material-ui/lib/svg-icons/editor/mode-edit';
import MoveToFirstIcon from 'material-ui/lib/svg-icons/hardware/keyboard-arrow-up';
import DeleteIcon from 'material-ui/lib/svg-icons/action/delete';
import { addMedia, moveMedia, removeMedia } from '../../actions/PlaylistActionCreators';
import AddingMenu from '../PlaylistManager/AddingMenu';
import PlaylistStore from '../../stores/PlaylistStore';

export default class Actions extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    media: React.PropTypes.object
  };

  state = { adding: false };

  onAdd() {
    this.setState({ adding: true });
  }

  onAddTo(playlist) {
    this.setState({ adding: false });
    addMedia(playlist, [ this.props.media ]);
  }

  onEdit() {
  }

  onFirst() {
    // TODO use current selection instead
    // (and also do this in a much more high level component)
    moveMedia(PlaylistStore.getSelectedPlaylist()._id, [ this.props.media ], -1);
  }

  onDelete() {
    removeMedia(PlaylistStore.getSelectedPlaylist()._id, this.props.media._id);
  }

  render() {
    const { adding } = this.state;
    return (
      <div className={cx('MediaActions', this.props.className)}>
        <div
          className="MediaActions-action"
          onClick={::this.onAdd}
        >
          <AddIcon color="#fff" />
        </div>
        {adding && <AddingMenu onSelect={::this.onAddTo} />}
        <div
          className="MediaActions-action"
          onClick={::this.onEdit}
        >
          <EditIcon color="#fff" />
        </div>
        <div
          className="MediaActions-action"
          onClick={::this.onFirst}
        >
          <MoveToFirstIcon color="#fff" />
        </div>
        <div
          className="MediaActions-action"
          onClick={::this.onDelete}
        >
          <DeleteIcon color="#fff" />
        </div>
      </div>
    );
  }
}
