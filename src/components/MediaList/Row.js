import cx from 'classnames';
import React from 'react';
import { DragSource } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
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

const collect = connect => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview()
});

@DragSource(MEDIA, mediaSource, collect)
export default class Row extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    connectDragSource: React.PropTypes.func.isRequired,
    connectDragPreview: React.PropTypes.func.isRequired,
    media: React.PropTypes.object,
    selected: React.PropTypes.bool,
    selection: React.PropTypes.array,

    makeActions: React.PropTypes.func
  };

  static defaultProps = {
    selected: false
  };

  state = { showActions: false };

  componentDidMount() {
    this.props.connectDragPreview(getEmptyImage());
  }

  handleMouseEnter = () => {
    this.setState({ showActions: true });
  };

  handleMouseLeave = () => {
    this.setState({ showActions: false });
  };

  renderThumbnail() {
    const { media } = this.props;

    if (media.loading) {
      return <MediaLoadingIndicator className="MediaListRow-loader" />;
    }

    return (
      <div className="MediaListRow-thumb">
        <img
          className="MediaListRow-image"
          key={media._id}
          src={media.thumbnail}
          alt=""
        />
      </div>
    );
  }

  render() {
    const {
      className, media, selection, selected,
      connectDragSource,
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
    return connectDragSource(
      <div
        className={cx('MediaListRow', className, selectedClass, loadingClass)}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        {...attrs}
      >
        {this.renderThumbnail()}
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
