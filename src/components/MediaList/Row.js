import cx from 'classnames';
import React from 'react';
import { DragSource } from 'react-dnd';
import { MEDIA } from '../../constants/DDItemTypes';
import formatDuration from '../../utils/formatDuration';
import MediaLoadingIndicator from './MediaLoadingIndicator';
import Actions from './Actions';

const inSelection = (selection, media) =>
  selection.some(item => item._id === media._id);

const mediaSource = {
  beginDrag({ selection, media }) {
    return {
      media: inSelection(selection, media) ? selection : [ media ]
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
    selection: React.PropTypes.array,

    makeActions: React.PropTypes.func
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
      className, media, selection, selected,
      connectDragSource, isDragging,
      // actions
      makeActions,
      // etc
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
        <div className="MediaListRow-artist" title={media.artist}>
          {media.artist}
        </div>
        <div className="MediaListRow-title" title={media.title}>
          {media.title}
        </div>
        <div className="MediaListRow-duration">
          {formatDuration(duration)}
        </div>
        {showActions && (
          <Actions
            ref="actions"
            className={cx('MediaListRow-actions', selectedClass)}
            selection={selection}
            media={media}
            makeActions={makeActions}
          />
        )}
      </div>
    );
  }
}
