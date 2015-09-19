import cx from 'classnames';
import React from 'react';

export default class Eta extends React.Component {
  static propTypes = {
    className: React.PropTypes.string
  };

  render() {
    return (
      <span className={cx('Eta', this.props.className)}>
        a while
      </span>
    );
  }
}
