import cx from 'classnames';
import React from 'react';

export default class Loader extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    size: React.PropTypes.oneOf([ 'tiny', 'large' ])
  };

  render() {
    return <div className={cx('Loader', `Loader-${this.props.size}`, this.props.className)} />;
  }
}
