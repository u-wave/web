import React from 'react';
import YouTube from 'react-youtube';
import CurrentMediaStore from '../../stores/CurrentMediaStore';

function getMediaState() {
  return CurrentMediaStore.getMedia();
}

export default class Video extends React.Component {

  state = getMediaState();

  constructor() {
    super();
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    CurrentMediaStore.on('change', this._onChange);
  }

  componentWillUnmount() {
    CurrentMediaStore.off('change', this._onChange);
  }

  _onChange() {
    this.setState(getMediaState());
  }

  render() {
    let video = '';

    switch (this.state.source) {
      case 'youtube':
        video = (
          <YouTube
            url={'https://youtube.com/watch?v=' + this.state.id}
            opts={{
              playerVars: {
                autoplay: 1,
                controls: 0,
                start: 0
              }
            }}
          />
        );
    }

    return (
      <div className="Embed">
        {video}
      </div>
    );
  }

}
