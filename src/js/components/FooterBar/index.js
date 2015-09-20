import React from 'react';
import NextMedia from './NextMedia';
import UserInfo from './UserInfo';
import PlaylistStore from '../../stores/PlaylistStore';
import UserStore from '../../stores/UserStore';

function getState() {
  return {
    playlist: PlaylistStore.getCurrentPlaylist(),
    nextMedia: { artist: 'Swings', title: 'Bulldozer' },
    user: UserStore.getCurrentUser()
  };
}

export default class FooterBar extends React.Component {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
  }

  state = getState();

  componentDidMount() {
    PlaylistStore.on('change', this.onChange);
  }

  componentWillUnmount() {
    PlaylistStore.removeListener('change', this.onChange);
  }

  onChange() {
    this.setState(getState());
  }

  render() {
    return (
      <div className="FooterBar">
        <UserInfo user={this.state.user} />
        <NextMedia
          playlist={this.state.playlist}
          nextMedia={this.state.nextMedia}
        />
      </div>
    );
  }
}
