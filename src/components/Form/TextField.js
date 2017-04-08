import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

export default class TextField extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    type: PropTypes.string,
    icon: PropTypes.element
  };

  static defaultProps = {
    type: 'text'
  };

  get value() {
    return this.input.value;
  }

  refInput = (input) => {
    this.input = input;
  };

  render() {
    const { type, icon, className, ...props } = this.props;
    return (
      <div className={cx('TextField', className)}>
        <input
          ref={this.refInput}
          className="TextField-input"
          type={type}
          {...props}
        />
        <div className="TextField-icon">{icon}</div>
      </div>
    );
  }
}
