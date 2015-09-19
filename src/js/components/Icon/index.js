import cx from 'classnames';
import React from 'react';

export default class Icon extends React.Component {
  static propTypes = {
    name: React.PropTypes.string
  };

  render() {
    const { name, ...props } = this.props;
    return (
      <i
        className={cx('material-icons', 'Icon', `Icon--${name}`)}
        { ...props }
      >
        {name}
      </i>
    );
  }
}
