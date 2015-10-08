import cx from 'classnames';
import React from 'react';
import { togglePlaylistManager } from '../../actions/OverlayActionCreators';
import PlaylistStore from '../../stores/PlaylistStore';
import UserStore from '../../stores/UserStore';
import NextMedia from './NextMedia';
import UserInfo from './UserInfo';

function getState() {
  return {
    playlist: PlaylistStore.getActivePlaylist(),
    nextMedia: PlaylistStore.getActiveMedia()[0],
    user: UserStore.getCurrentUser()
  };
}

export default class FooterBar extends React.Component {
  static propTypes = {
    className: React.PropTypes.string
  };

  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
  }

  state = getState();

  componentDidMount() {
    PlaylistStore.on('change', this.onChange);
    UserStore.on('change', this.onChange);
  }

  componentWillUnmount() {
    PlaylistStore.removeListener('change', this.onChange);
    UserStore.removeListener('change', this.onChange);
  }

  onChange() {
    this.setState(getState());
  }

  render() {
    const { user, playlist, nextMedia } = this.state;
    const className = cx('FooterBar', this.props.className);

    if (user && !user.isGuest) {
      return (
        <div className={className}>
          <UserInfo user={user} />
          <NextMedia
            playlist={playlist}
            nextMedia={nextMedia}
            onClick={togglePlaylistManager}
          />
        </div>
      );
    }
    return (
      <div className={className}>
        <div className="FooterBar-guest">You have to log in if you want to play!</div>
      </div>
    );
  }
}
