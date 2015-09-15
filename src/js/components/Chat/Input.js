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
    return (
      <div className="ChatInput">
        <input
          className="ChatInput-input"
          type="text"
          placeholder={this.state.focused ? '' : 'Click here to chat!'}
          onFocus={this.onFocus.bind(this)}
          onBlur={this.onBlur.bind(this)}
        />
      </div>
    );
  }
}
