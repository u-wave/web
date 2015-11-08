import cx from 'classnames';
import React from 'react';
import formatDuration from '../../utils/formatDuration';
import Actions from './Actions';

export default class Row extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    media: React.PropTypes.object,
    selected: React.PropTypes.bool
  };

  static defaultProps = {
    selected: false
  };

  state = { showActions: false };

  onMouseEnter() {
    this.setState({ showActions: true });
  }

  onMouseLeave() {
    this.setState({ showActions: false });
  }

  render() {
    const { className, media, selected, ...attrs } = this.props;
    const { showActions } = this.state;
    const selectedClass = selected ? 'is-selected' : '';
    const duration = 'start' in media
      // playlist item
      ? media.end - media.start
      // search result
      : media.duration;
    return (
      <div
        className={cx('MediaListRow', className, selectedClass)}
        onMouseEnter={::this.onMouseEnter}
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
        {showActions && (
          <Actions
            ref="actions"
            className={cx('MediaListRow-actions', selectedClass)}
            media={media}
          />
        )}
      </div>
    );
  }
}
