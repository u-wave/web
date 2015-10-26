import cx from 'classnames';
import React from 'react';
import Actions from './Actions';

const padZero = n => n < 10 ? `0${n}` : n;
function formatDuration(duration) {
  const h = Math.floor(duration / 3600);
  const m = Math.floor((duration % 3600) / 60);
  const s = padZero(Math.floor(duration % 60));
  return (h > 0 ? [ h, m, s ] : [ m, s ]).join(':');
}

export default class Row extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    media: React.PropTypes.object,
    selected: React.PropTypes.bool
  };

  static defaultProps = {
    selected: false
  };

  onMouseLeave() {
    if (this.refs.actions) {
      this.refs.actions.onMouseLeave();
    }
  }

  render() {
    const { className, media, selected, ...attrs } = this.props;
    const selectedClass = selected ? 'is-selected' : '';
    const duration = 'start' in media
      // playlist item
      ? media.end - media.start
      // search result
      : media.duration;
    return (
      <div
        className={cx('MediaListRow', className, selectedClass)}
        onMouseLeave={::this.onMouseLeave}
        {...attrs}
      >
        <div className="MediaListRow-thumb">
          <img
            className="MediaListRow-image"
            src={media.thumbnail}
            alt=""
          />
        </div>
        <div className="MediaListRow-artist">
          {media.artist}
        </div>
        <div className="MediaListRow-title">
          {media.title}
        </div>
        <div className="MediaListRow-duration">
          {formatDuration(duration)}
        </div>
        <Actions
          ref="actions"
          className={cx('MediaListRow-actions', selectedClass)}
          media={media}
        />
      </div>
    );
  }
}
