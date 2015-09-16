import React from 'react';
import Avatar from '../Avatar';

export default class Message extends React.Component {
  static propTypes = {
    username: React.PropTypes.string,
    text: React.PropTypes.string
  }

  render() {
    return (
      <div className="ChatMessage">
        <Avatar
          className="ChatMessage-avatar"
          username={this.props.username}
        />
        <div className="ChatMessage-content">
          <span className="ChatMessage-username">{this.props.username}</span>
          <span className="ChatMessage-text">{this.props.text}</span>
        </div>
      </div>
    );
  }
}
