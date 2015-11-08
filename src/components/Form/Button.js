import cx from 'classnames';
import React from 'react';
import oneOrManyChildren from '../../utils/propTypes/oneOrManyChildren';

export default class Button extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    text: React.PropTypes.string,
    children: oneOrManyChildren
  };

  render() {
    const { className, text, children, ...props } = this.props;
    return (
      <button className={cx('Button', className)} {...props}>
        {text || children}
      </button>
    );
  }
}
