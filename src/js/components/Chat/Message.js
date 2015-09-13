import React from 'react';

export default class Message extends React.Component {
  static propTypes = {
    username: React.PropTypes.string,
    text: React.PropTypes.string
  }

  render() {
    return (
      <div className="ChatMessage">
        <div className="ChatMessage-avatar ChatAvatar">
          <img
            className="ChatAvatar-image"
            src={'https://sigil.cupcake.io/_' + this.props.username}
          />
        </div>
        <div className="ChatMessage-content">
          <span className="ChatMessage-username">{this.props.username}</span>
          <span className="ChatMessage-text">{this.props.text}</span>
        </div>
      </div>
    );
  }
}
