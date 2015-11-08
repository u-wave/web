import cx from 'classnames';
import React from 'react';

export default class TextField extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    type: React.PropTypes.string,
    icon: React.PropTypes.element
  };

  static defaultProps = {
    type: 'text'
  };

  get value() {
    return this.refs.input.value;
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
        <div className="TextField-icon">{icon}</div>
      </div>
    );
  }
}
