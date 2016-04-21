import cx from 'classnames';
import React from 'react';
import { DragSource } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import TimeAgo from 'react-timeago';
import { MEDIA } from '../../constants/DDItemTypes';
import SongTitle from '../SongTitle';
import Actions from '../MediaList/Actions';

import HistoryVotes from './Votes';

const inSelection = (selection, media) =>
  selection.some(item => item._id === media._id);

const mediaSource = {
  beginDrag({ selection, media }) {
    return {
      media: inSelection(selection, media.media) ? selection : [ media.media ]
    };
  }
};

const collect = connect => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview()
});

@DragSource(MEDIA, mediaSource, collect)
export default class HistoryRow extends React.Component {
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

  render() {
    const {
      media: historyEntry,
      className, selection, selected,
      connectDragSource,
      // actions
      makeActions,
      // etc
      ...attrs
    } = this.props;
    const { media, timestamp, user, stats } = historyEntry;
    const { showActions } = this.state;
    const selectedClass = selected ? 'is-selected' : '';
    const thumbnail = (
      <div className="MediaListRow-thumb">
        <img
          className="MediaListRow-image"
          src={media.thumbnail}
          alt=""
        />
      </div>
    );
    return connectDragSource(
      <div
        className={cx('MediaListRow', 'HistoryRow', className, selectedClass)}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        {...attrs}
      >
        {thumbnail}
        <SongTitle
          className="HistoryRow-song"
          size="mediaRow"
          artist={media.artist}
          title={media.title}
        />
        <div className="HistoryRow-votes">
          <HistoryVotes {...stats} />
        </div>
        <div className="HistoryRow-user">
          {user.username}
        </div>
        <div className="HistoryRow-time">
          <TimeAgo date={timestamp} live />
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
