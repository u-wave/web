import React from 'react';

export default class VideoBackdrop extends React.Component {
  static propTypes = {
    url: React.PropTypes.string
  };

  render() {
    const { url } = this.props;
    return <img className="VideoBackdrop" src={url} alt="" />;
  }
}
