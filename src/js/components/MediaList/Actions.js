import cx from 'classnames';
import React from 'react';
import Icon from '../Icon';

export default class Actions extends React.Component {
  static propTypes = {
    className: React.PropTypes.string
  }

  onEdit() {
  }

  onFirst() {
  }

  onDelete() {
  }

  render() {
    return (
      <div className={cx('MediaActions', this.props.className)}>
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
