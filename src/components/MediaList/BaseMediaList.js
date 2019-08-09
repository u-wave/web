import cx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { FixedSizeList } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import AutoSizer from 'react-virtualized-auto-sizer';
import itemSelection from 'item-selection/immutable';
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

export default class BaseMediaList extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    media: PropTypes.array,
    size: PropTypes.number,
    onRequestPage: PropTypes.func,
    listComponent: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
    ]).isRequired,
    rowComponent: PropTypes.func.isRequired,
    rowProps: PropTypes.object,

    onOpenPreviewMediaDialog: PropTypes.func,
    makeActions: PropTypes.func,
  };

  static defaultProps = {
    // The `size` property is only necessary for lazy loading.
    size: null,
    makeActions: () => <span />,
  };

  state = {
    // eslint-disable-next-line react/destructuring-assignment
    selection: itemSelection(this.props.media),
  };

  componentWillReceiveProps(nextProps) {
    const { media } = this.props;
    const { selection } = this.state;

    if (nextProps.media !== media) {
      const selectedIndices = selection.getIndices();
      const mediaChanged = didMediaChange(media, nextProps.media);
      this.setState({
        selection: mediaChanged
          ? itemSelection(nextProps.media)
          : itemSelection(nextProps.media, selectedIndices),
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

  renderList = (items, ref) => {
    const { listComponent: ListComponent } = this.props;

    return (
      <ListComponent ref={ref}>
        {items}
      </ListComponent>
    );
  };

  renderRow = ({ index, style }) => {
    const {
      makeActions,
      rowProps: props = {},
      media,
      rowComponent: RowComponent,
      onOpenPreviewMediaDialog,
    } = this.props;
    const { selection } = this.state;

    const selected = selection.isSelectedIndex(index);
    if (!media[index]) {
      return (
        <LoadingRow
          key={index}
          className="MediaList-row"
          style={style}
          selected={selected}
        />
      );
    }

    return (
      <RowComponent
        key={media[index] ? media[index]._id : index}
        {...props}
        style={style}
        className="MediaList-row"
        media={media[index]}
        selected={selected}
        selection={selection.get()}
        onClick={e => this.selectItem(index, e)}
        onOpenPreviewMediaDialog={onOpenPreviewMediaDialog}
        makeActions={() => makeActions(media[index], selection, index)}
      />
    );
  };

  render() {
    const {
      className, media, size, onRequestPage,
    } = this.props;
    const { listComponent: ListComponent } = this.props;
    // const { selection } = this.state;

    const innerList = ({ height, onItemsRendered, ref }) => (
      <FixedSizeList
        itemCount={size || media.length}
        itemSize={56}
        height={height}
        onItemsRendered={onItemsRendered}
        ref={ref}
        width="100%"
      >
        {this.renderRow}
      </FixedSizeList>
    );

    const lazyLoading = makeList => ({ height }) => {
      const isItemLoaded = index => media[index] != null;
      const loadMoreItems = (start) => {
        const page = Math.floor(start / 50);
        onRequestPage(page);
      };

      const inner = ({ onItemsRendered, ref }) => makeList({ onItemsRendered, ref, height });
      return (
        <InfiniteLoader
          isItemLoaded={isItemLoaded}
          itemCount={size || media.length}
          loadMoreItems={loadMoreItems}
        >
          {inner}
        </InfiniteLoader>
      );
    };

    const customWrapper = makeList => props => (
      <ListComponent>
        {makeList(props)}
      </ListComponent>
    );

    const autoSizing = makeList => () => {
      const inner = ({ height }) => makeList({ height });
      return (
        <AutoSizer disableWidth>
          {inner}
        </AutoSizer>
      );
    };

    let listRenderer = innerList;
    if (onRequestPage) {
      listRenderer = lazyLoading(listRenderer);
    }
    listRenderer = customWrapper(listRenderer);
    listRenderer = autoSizing(listRenderer);

    return (
      <div className={cx('MediaList', className)}>
        {listRenderer()}
      </div>
    );
  }
}
