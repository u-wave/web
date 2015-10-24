import cx from 'classnames';
import React from 'react';
import { addMedia, moveMedia } from '../../actions/PlaylistActionCreators';
import Icon from '../Icon';
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
  }

  onMouseLeave() {
    this.setState({ adding: false });
  }

  render() {
    const { adding } = this.state;
    return (
      <div className={cx('MediaActions', this.props.className)}>
        <Icon
          className="MediaActions-action"
          name="add"
          onClick={::this.onAdd}
        />
        {adding && <AddingMenu onSelect={::this.onAddTo} />}
        <Icon
          className="MediaActions-action"
          name="edit"
          onClick={::this.onEdit}
        />
        <Icon
          className="MediaActions-action"
          name="keyboard_arrow_up"
          onClick={::this.onFirst}
        />
        <Icon
          className="MediaActions-action"
          name="delete"
          onClick={::this.onDelete}
        />
      </div>
    );
  }
}
