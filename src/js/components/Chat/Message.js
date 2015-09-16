import React from 'react';
import Avatar from '../Avatar';

export default class Message extends React.Component {
  static propTypes = {
    user: React.PropTypes.object,
    text: React.PropTypes.string
  }

  render() {
    const { user, text } = this.props;
    return (
      <div className="ChatMessage">
        <Avatar
          className="ChatMessage-avatar"
          user={user}
        />
        <div className="ChatMessage-content">
          <span className="ChatMessage-username">{user.username}</span>
          <span className="ChatMessage-text">{text}</span>
        </div>
      </div>
    );
  }
}
