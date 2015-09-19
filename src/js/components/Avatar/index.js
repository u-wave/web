import cx from 'classnames';
import React from 'react';

export default class Avatar extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    user: React.PropTypes.object
  };

  render() {
    return (
      <div className={cx('Avatar', this.props.className)}>
        <img
          className="Avatar-image"
          src={this.props.user.avatar}
        />
      </div>
    );
  }
}
