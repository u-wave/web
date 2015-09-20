import cx from 'classnames';
import React from 'react';
import Avatar from '../Avatar';
import Loader from '../Loader';

export default class Message extends React.Component {
  static propTypes = {
    user: React.PropTypes.object,
    text: React.PropTypes.string,
    inFlight: React.PropTypes.bool
  }

  render() {
    const { user, text, inFlight } = this.props;
    let avatar;
    if (inFlight) {
      avatar = (
        <div className="ChatMessage-avatar">
          <Loader size="tiny" />
        </div>
      );
    } else {
      avatar = (
        <Avatar
          className="ChatMessage-avatar"
          user={user}
        />
      );
    }
    return (
      <div className={cx('ChatMessage', inFlight ? 'ChatMessage--loading' : '')}>
        {avatar}
        <div className="ChatMessage-content">
          <span className="ChatMessage-username">{user.username}</span>
          <span className="ChatMessage-text">{text}</span>
        </div>
      </div>
    );
  }
}
