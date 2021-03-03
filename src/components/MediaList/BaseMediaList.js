import cx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { FixedSizeList } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import AutoSizer from 'react-virtualized-auto-sizer';
import itemSelection from 'item-selection/immutable';
import useDirection from '../../hooks/useDirection';
import LoadingRow from './LoadingRow';

const {
  useCallback,
  useEffect,
  useRef,
  useState,
} = React;

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

const defaultMakeActions = () => null;

function BaseMediaList({
  className,
  media,
  listComponent: ListComponent,
  rowComponent: RowComponent,
  rowProps = {},
  onRequestPage,
  onOpenPreviewMediaDialog,
  // The `size` property is only necessary for lazy loading.
  size = null,
  makeActions = defaultMakeActions,
}) {
  const lastMediaRef = useRef(media);
  const [selection, setSelection] = useState(() => itemSelection(media));
  const inFlightPageRequests = useRef({});
  const direction = useDirection();

  useEffect(() => {
    const lastMedia = lastMediaRef.current;
    if (lastMedia !== media) {
      lastMediaRef.current = media;
      const selectedIndices = selection.getIndices();
      const mediaChanged = didMediaChange(lastMedia, media);
      setSelection(mediaChanged ? itemSelection(media) : itemSelection(media, selectedIndices));
    }
  }, [media, selection]);

  const selectItem = useCallback((index, event) => {
    event.preventDefault();

    if (event.shiftKey) {
      setSelection(selection.selectRange(index));
    } else if (event.ctrlKey) {
      setSelection(selection.selectToggle(index));
    } else {
      setSelection(selection.select(index));
    }
  }, [selection]);

  const renderRow = useCallback(({ index, style }) => {
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
        {...rowProps}
        style={style}
        className="MediaList-row"
        media={media[index]}
        selected={selected}
        selection={selection.get()}
        onClick={(event) => selectItem(index, event)}
        onOpenPreviewMediaDialog={onOpenPreviewMediaDialog}
        makeActions={() => makeActions(media[index], selection, index)}
      />
    );
    // `RowComponent` should really be in this list but then react-hooks/exhaustive-deps complains.
    // We don't change it on the fly ever I think and shouldn't, but if we ever did have a reason
    // to do it, this might break :)
  }, [selection, media, rowProps, onOpenPreviewMediaDialog, makeActions, selectItem]);

  const mediaLength = media.length;
  const innerList = ({ height, onItemsRendered, ref }) => (
    <FixedSizeList
      itemCount={size || mediaLength}
      itemSize={56}
      height={height}
      onItemsRendered={onItemsRendered}
      ref={ref}
      width="100%"
      direction={direction}
      rerenderOnUpdate={selection}
    >
      {renderRow}
    </FixedSizeList>
  );

  // This is not used as a real React component.
  // eslint-disable-next-line react/prop-types
  const lazyLoading = (makeList) => ({ height }) => {
    const isItemLoaded = (index) => media[index] != null;
    const loadMoreItems = (start) => {
      const page = Math.floor(start / 50);
      if (inFlightPageRequests.current[page]) return Promise.resolve(null);
      inFlightPageRequests.current[page] = 1;

      return onRequestPage(page).finally(() => {
        // Without the timeout we can still get duplicate requests.
        // That is *probably* because a rerender is triggered by some
        // redux action on request completion, just *before* the new
        // playlist items are actually stored in state.
        setTimeout(() => {
          delete inFlightPageRequests.current[page];
        }, 200);
      });
    };

    const inner = ({ onItemsRendered, ref }) => makeList({ onItemsRendered, ref, height });
    return (
      <InfiniteLoader
        isItemLoaded={isItemLoaded}
        itemCount={size || mediaLength}
        loadMoreItems={loadMoreItems}
      >
        {inner}
      </InfiniteLoader>
    );
  };

  const customWrapper = (makeList) => (props) => (
    <ListComponent>
      {makeList(props)}
    </ListComponent>
  );

  const autoSizing = (makeList) => () => {
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

BaseMediaList.propTypes = {
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

export default BaseMediaList;
