import cx from 'classnames';
import React from 'react';

export default class Panel extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    name: React.PropTypes.string,
    children: React.PropTypes.element.isRequired
  };

  render() {
    return (
      <div className={cx('Panel', this.props.className)}>
        {this.props.children}
      </div>
    );
  }
}
