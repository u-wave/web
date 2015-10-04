import cx from 'classnames';
import React from 'react';
import Icon from '../Icon';

export default class TextField extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    type: React.PropTypes.string,
    icon: React.PropTypes.string
  };

  static defaultProps = {
    type: 'text'
  };

  get value() {
    return React.findDOMNode(this.refs.input).value;
  }

  render() {
    const { type, icon, className, ...props } = this.props;
    return (
      <div className={cx('TextField', className)}>
        <input
           ref="input"
           className="TextField-input"
           type={type}
           {...props}
         />
        <Icon className="TextField-icon" name={icon} />
      </div>
    );
  }
}
