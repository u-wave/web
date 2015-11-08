import cx from 'classnames';
import React from 'react';

export default class EmptyPanel extends React.Component {
  static propTypes = {
    className: React.PropTypes.string
  };

  render() {
    const { className } = this.props;

    return (
      <div className={cx('PlaylistPanel', 'PlaylistPanel--empty', className)}>
        You don't have a playlist yet!
      </div>
    );
  }
}
