import React from 'react';
import Chat from '../Chat';
import Video from '../Video';
import HeaderBar from '../HeaderBar';

export default class App extends React.Component {

  render() {
    return (
      <div className="App">
        <HeaderBar
          className="App-header"
          title="üwave"
        />
        <div className="App-middle">
          <div className="left">
            <Video />
          </div>
          <div className="right">
            <Chat />
          </div>
        </div>
        <div className="BottomBar">
          .
        </div>
      </div>
    );
  }

}
