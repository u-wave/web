import cx from 'classnames';
import React from 'react';
import Actions from './Actions';

export default class Row extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    media: React.PropTypes.object
  };

  render() {
    const { className, media } = this.props;
    return (
      <div className={cx('MediaListRow', className)}>
        <div className="MediaListRow-thumb">
          <img src={media.thumbnail} alt="" />
        </div>
        <div className="MediaListRow-artist">
          {media.artist}
        </div>
        <div className="MediaListRow-title">
          {media.title}
        </div>
        <Actions className="MediaListRow-actions" />
      </div>
    );
  }
}
