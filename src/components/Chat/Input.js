import cx from 'classnames';
import React, { Component, PropTypes } from 'react';

export default class Input extends Component {
  static propTypes = {
    send: PropTypes.func
  };

  state = { focused: false };

  handleFocus = () => {
    this.setState({ focused: true });
  };
  handleBlur = () => {
    this.setState({ focused: false });
  };

  handleKeyDown = e => {
    e.stopPropagation();
    if (e.key === 'Enter') {
      const value = e.target.value.trim();
      if (value.length > 0) {
        this.props.send(value);
      }
      e.target.value = ''; // eslint-disable-line no-param-reassign
    }
  };

  render() {
    const { focused } = this.state;
    const focusClass = focused ? 'is-focused' : '';
    return (
      <div className={cx('ChatInput', focusClass)}>
        <input
          className={cx('ChatInput-input', focusClass)}
          type="text"
          placeholder={focused ? '' : 'Click here to chat!'}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onKeyDown={this.handleKeyDown}
        />
      </div>
    );
  }
}
