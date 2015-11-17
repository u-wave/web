import cx from 'classnames';
import React from 'react';
import { DragSource } from 'react-dnd';
import { MEDIA } from '../../constants/DDItemTypes';
import formatDuration from '../../utils/formatDuration';
import MediaLoadingIndicator from '../MediaLoadingIndicator';
import Actions from './Actions';

const mediaSource = {
  beginDrag(props) {
    return {
      // fall back to the row's media item if nothing is selected, i.e. if the
      // user drags a single row without selecting other rows first
      // TODO perhaps also fall back to the current row's media item if the
      // current row is not selected?
      media: props.selection || [ props.media ]
    };
  }
};

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
});

@DragSource(MEDIA, mediaSource, collect)
export default class Row extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    connectDragSource: React.PropTypes.func.isRequired,
    isDragging: React.PropTypes.bool.isRequired,
    media: React.PropTypes.object,
    selected: React.PropTypes.bool,
    selection: React.PropTypes.array
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
    const {
      className, media, selected,
      connectDragSource, isDragging,
      ...attrs
    } = this.props;
    const { showActions } = this.state;
    const selectedClass = selected ? 'is-selected' : '';
    const loadingClass = media.loading ? 'is-loading' : '';
    const duration = 'start' in media
      // playlist item
      ? media.end - media.start
      // search result
      : media.duration;
    const thumbnail = media.loading
      ? <MediaLoadingIndicator className="MediaListRow-loader" />
      : <div className="MediaListRow-thumb">
          <img
            className="MediaListRow-image"
            src={media.thumbnail}
            alt=""
          />
        </div>;
    return connectDragSource(
      <div
        className={cx('MediaListRow', className, selectedClass, loadingClass)}
        onMouseEnter={::this.onMouseEnter}
        onMouseLeave={::this.onMouseLeave}
        {...attrs}
      >
        {thumbnail}
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
