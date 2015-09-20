import cx from 'classnames';
import React from 'react';
import { sendChat } from '../../actions/ChatActionCreators';

const ENTER_KEY = 13;

export default class Input extends React.Component {

  state = { focused: false };

  onFocus() {
    this.setState({ focused: true });
  }
  onBlur() {
    this.setState({ focused: false });
  }

  onKeyDown(e) {
    if (e.keyCode === ENTER_KEY) {
      sendChat(e.target.value);
      e.target.value = '';
    }
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
          onKeyDown={this.onKeyDown.bind(this)}
        />
      </div>
    );
  }
}
