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
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} = React;

const MediaListContext = React.createContext();
export function useMediaListContext() {
  return useContext(MediaListContext);
}

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

function BaseMediaList({
  className,
  media,
  listComponent: ListComponent,
  rowComponent,
  rowProps = {},
  contextProps,
  onRequestPage,
  // The `size` property is only necessary for lazy loading.
  size = null,
}) {
  const lastMediaRef = useRef(media);
  const [selection, setSelection] = useState(() => itemSelection(media));
  const inFlightPageRequests = useRef({});
  const direction = useDirection();

  const context = useMemo(() => ({
    media,
    selection,
    ...contextProps,
  }), [media, selection, contextProps]);

  const itemKey = useCallback((index) => {
    if (media[index]) {
      return media[index]._id;
    }
    return `unloaded_${index}`;
  }, [media]);

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
    } else if (event.metaKey) {
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
          className="MediaList-row"
          style={style}
          selected={selected}
        />
      );
    }

    // Rename it here instead of in the parameter list,
    // else the react-hooks/exhaustive-deps lint rule does not see
    // that `RowComponent` is used in this effect.
    const RowComponent = rowComponent;
    return (
      <RowComponent
        {...rowProps}
        style={style}
        className="MediaList-row"
        index={index}
        media={media[index]}
        selected={selected}
        selection={selection.get()}
        onClick={(event) => selectItem(index, event)}
      />
    );
  }, [selection, media, rowComponent, rowProps, selectItem]);

  const mediaLength = media.length;
  const innerList = ({ height, onItemsRendered, ref }) => (
    <FixedSizeList
      itemCount={size || mediaLength}
      itemSize={56}
      itemKey={itemKey}
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
    <MediaListContext.Provider value={context}>
      <div className={cx('MediaList', className)}>
        {listRenderer()}
      </div>
    </MediaListContext.Provider>
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
  contextProps: PropTypes.object,
};

export default BaseMediaList;
