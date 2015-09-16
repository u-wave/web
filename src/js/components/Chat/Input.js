import cx from 'classnames';
import React from 'react';

export default class Input extends React.Component {

  state = { focused: false };

  onFocus(e) {
    this.setState({ focused: true });
  }
  onBlur(e) {
    this.setState({ focused: false });
  }

  render() {
    const focusClass = this.state.focused ? 'is-focused' : '';
    return (
      <div className={cx('ChatInput', focusClass)}>
        <input
          className={cx('ChatInput-input', focusClass)}
          type="text"
          placeholder={this.state.focused ? '' : 'Click here to chat!'}
          onFocus={this.onFocus.bind(this)}
          onBlur={this.onBlur.bind(this)}
        />
      </div>
    );
  }
}
