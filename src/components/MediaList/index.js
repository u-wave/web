import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import BaseList from 'react-list';
import LazyList from 'react-list-lazy-load';
import itemSelection from 'item-selection/immutable';
import Row from './Row';
import LoadingRow from './LoadingRow';

/**
 * Check if two media lists are different, taking into account
 * pagination. If the new media list contains items where the previous
 * list doesn't, but every other item is identical, we assume
 * the new list has just loaded a page that wasn't loaded in the
 * previous one, and decide that the list is not really different.
 */
function didMediaChange(prev, next) {
  return prev.some((item, i) => item && next[i] && item._id !== next[i]._id);
}

export default class MediaList extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    media: PropTypes.array,
    size: PropTypes.number,
    onRequestPage: PropTypes.func,
    rowComponent: PropTypes.func,
    rowProps: PropTypes.object,

    onOpenPreviewMediaDialog: PropTypes.func,
    makeActions: PropTypes.func
  };

  static defaultProps = {
    // The `size` property is only necessary for lazy loading.
    size: null,
    rowComponent: Row,
    makeActions: () => <span />
  };

  state = { selection: itemSelection(this.props.media) };

  componentWillReceiveProps(nextProps) {
    if (nextProps.media !== this.props.media) {
      const selection = this.state.selection.getIndices();
      const mediaChanged = didMediaChange(this.props.media, nextProps.media);
      this.setState({
        selection: mediaChanged
          ? itemSelection(nextProps.media)
          : itemSelection(nextProps.media, selection)
      });
    }
  }

  selectItem(index, e) {
    e.preventDefault();

    let { selection } = this.state;

    if (e.shiftKey) {
      selection = selection.selectRange(index);
    } else if (e.ctrlKey) {
      selection = selection.selectToggle(index);
    } else {
      selection = selection.select(index);
    }

    this.setState({ selection });
  }

  renderRow = (index) => {
    const makeActions = this.props.makeActions;
    const props = this.props.rowProps || {};
    const media = this.props.media[index];
    const { selection } = this.state;
    const selected = selection.isSelectedIndex(index);
    if (!media) {
      return (
        <LoadingRow
          key={index}
          className="MediaList-row"
          selected={selected}
        />
      );
    }
    const MediaRow = this.props.rowComponent;
    const isAlternate = index % 2 === 0;
    return (
      <MediaRow
        key={media ? media._id : index}
        {...props}
        className={cx('MediaList-row', isAlternate && 'MediaListRow--alternate')}
        media={media}
        selected={selected}
        selection={selection.get()}
        onClick={e => this.selectItem(index, e)}
        onOpenPreviewMediaDialog={this.props.onOpenPreviewMediaDialog}
        makeActions={() => makeActions(media, selection, index)}
      />
    );
  };

  render() {
    const { className, media, size, onRequestPage } = this.props;
    let list = (
      <BaseList
        itemRenderer={this.renderRow}
        length={size || media.length}
        type="uniform"
        forceUpdateOnMediaChange={media}
        forceUpdateOnSelectionChange={this.state.selection}
      />
    );
    if (onRequestPage) {
      list = (
        <LazyList
          items={media}
          length={size || media.length}
          pageSize={50}
          onRequestPage={onRequestPage}
        >
          {list}
        </LazyList>
      );
    }
    return (
      <div className={cx('MediaList', className)}>
        {list}
      </div>
    );
  }
}
