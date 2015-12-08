import cx from 'classnames';
import React from 'react';
import AddIcon from 'material-ui/lib/svg-icons/content/add';
import EditIcon from 'material-ui/lib/svg-icons/editor/mode-edit';
import MoveToFirstIcon from 'material-ui/lib/svg-icons/hardware/keyboard-arrow-up';
import DeleteIcon from 'material-ui/lib/svg-icons/action/delete';
import { addMedia } from '../../actions/PlaylistActionCreators';
import AddingMenu from '../PlaylistManager/AddingMenu/Container';

export default class Actions extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    media: React.PropTypes.object,
    selection: React.PropTypes.array
  };

  state = { adding: false };

  onAdd() {
    // TODO add an action child component for adding media to playlists
    this.setState({ adding: true });
  }

  onAddTo(playlist) {
    this.setState({ adding: false });
    // FIXME dispatch this
    addMedia(playlist, [ this.props.media ]);
  }

  onEdit() {
    // TODO add an action child component for editing playlist items
  }

  onFirst() {
    // TODO add an Action child component for moving playlist items
  }

  onDelete() {
    // TODO add an Action child component for deleting playlist items
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
