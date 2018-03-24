import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { isLoggedInSelector } from '../../selectors/userSelectors';

import ChatMessages from '../../containers/ChatMessages';
import ChatInput from '../../containers/ChatInput';
import LoginButtons from './LoginButtons';

const mapStateToProps = createStructuredSelector({
  isLoggedIn: isLoggedInSelector,
});

const ChatContainer = ({ isLoggedIn }) => (
  <div className="ChatContainer">
    <div className="ChatContainer-messages">
      <ChatMessages />
    </div>
    <div className="ChatContainer-input ChatInputWrapper">
      {isLoggedIn ? (
        <ChatInput />
      ) : (
        <LoginButtons />
      )}
    </div>
  </div>
);

ChatContainer.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(ChatContainer);
