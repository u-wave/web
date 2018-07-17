import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { MEDIA } from '../../constants/DDItemTypes';

import Actions from '../MediaList/Actions';
import SongTitle from '../SongTitle';
import TimeAgo from '../TimeAgo';

import HistoryVotes from './Votes';

const inSelection = (selection, media) => selection.some(item => item._id === media._id);

const mediaSource = {
  beginDrag({ selection, media }) {
    return {
      media: inSelection(selection, media.media) ? selection : [media.media],
    };
  },
};

const collect = connect => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
});

const enhance = DragSource(MEDIA, mediaSource, collect);

class HistoryRow extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    connectDragSource: PropTypes.func.isRequired,
    connectDragPreview: PropTypes.func.isRequired,
    media: PropTypes.object,
    selected: PropTypes.bool,
    selection: PropTypes.array,

    onOpenPreviewMediaDialog: PropTypes.func,
    onClick: PropTypes.func,
    makeActions: PropTypes.func,
  };

  static defaultProps = {
    selected: false,
  };

  state = { showActions: false };

  componentDidMount() {
    const { connectDragPreview } = this.props;

    connectDragPreview(getEmptyImage());
  }

  handleMouseEnter = () => {
    this.setState({ showActions: true });
  };

  handleMouseLeave = () => {
    this.setState({ showActions: false });
  };

  handleDoubleClick = () => {
    const { onOpenPreviewMediaDialog, media } = this.props;

    onOpenPreviewMediaDialog(media.media);
  };

  handleKeyPress = (event) => {
    const { onClick } = this.props;

    if (event.code === 'Space') {
      onClick();
    }
  };

  render() {
    const {
      media: historyEntry,
      className,
      selection,
      selected,
      connectDragSource,
      // actions
      makeActions,
      // etc
      onClick,
    } = this.props;
    const { showActions } = this.state;

    const {
      media, timestamp, user, stats,
    } = historyEntry;

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
    return connectDragSource((
      // See PlaylistManager/Panel/Row.js
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div
        className={cx('MediaListRow', 'HistoryRow', className, selectedClass)}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onDoubleClick={this.handleDoubleClick}
        onKeyPress={this.handleKeyPress}
        onClick={onClick}
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
        <div className="HistoryRow-time" dateTime={timestamp}>
          <TimeAgo timestamp={timestamp} />
        </div>
        {showActions && (
          <Actions
            className={cx('MediaListRow-actions', selectedClass)}
            selection={selection}
            media={media}
            makeActions={makeActions}
          />
        )}
      </div>
    ));
  }
}

export default enhance(HistoryRow);
