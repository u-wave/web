import assign from 'object-assign';
import cx from 'classnames';
import React from 'react';
import CurrentMediaStore from '../../stores/CurrentMediaStore';
import Volume from './Volume';
import NowPlaying from './NowPlaying';

function getState() {
  const media = CurrentMediaStore.getMedia();
  return {
    media: media
  };
}

export default class HeaderBar extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    title: React.PropTypes.string
  };

  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
  }

  state = getState();

  componentDidMount() {
    CurrentMediaStore.on('change', this.onChange);
  }

  componentWillUnmount() {
    CurrentMediaStore.off('change', this.onChange);
  }

  onChange() {
    this.setState(getState());
  }

  render() {
    const props = assign({}, this.props, {
      className: cx('HeaderBar', this.props.className)
    });
    const media = this.state.media;
    return (
      <div {...props}>
        <h1 className="HeaderBar-title">{props.title}</h1>
        <NowPlaying
          className="HeaderBar-now-playing"
          artist={media.artist}
          title={media.title}
        />
        <Volume className="HeaderBar-volume" />
      </div>
    );
  }
}
