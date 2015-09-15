import React from 'react';

export default class Input extends React.Component {

  render() {
    return (
      <div className="ChatInput">
        <input
          className="ChatInput-input"
          type="text"
          placeholder="Click here to chat!"
        />
      </div>
    );
  }
}
