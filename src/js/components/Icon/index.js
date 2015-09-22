import cx from 'classnames';
import React from 'react';

export default class Icon extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    name: React.PropTypes.string
  };

  render() {
    const { name, className, ...props } = this.props;
    return (
      <i
        className={cx('material-icons', 'Icon', `Icon--${name}`, className)}
        { ...props }
      >
        {name}
      </i>
    );
  }
}
