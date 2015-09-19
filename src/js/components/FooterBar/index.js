import React from 'react';
import NextMedia from './NextMedia';
import PlaylistStore from '../../stores/PlaylistStore';

function getState() {
  return {
    playlist: PlaylistStore.getCurrentPlaylist(),
    nextMedia: { artist: 'Swings', title: 'Bulldozer' }
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
        <NextMedia
          playlist={this.state.playlist}
          nextMedia={this.state.nextMedia}
        />
      </div>
    );
  }
}
