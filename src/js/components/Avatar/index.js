import cx from 'classnames';
import React from 'react';

export default class Avatar extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    username: React.PropTypes.string
  };

  render() {
    return (
      <div className={cx('Avatar', this.props.className)}>
        <img
          className="Avatar-image"
          src={'https://sigil.cupcake.io/_' + this.props.username}
        />
      </div>
    );
  }
}
