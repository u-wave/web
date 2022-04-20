import cx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { useVirtual } from 'react-virtual';
import itemSelection from 'item-selection/immutable';
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

function estimateSize() {
  return 56;
}

function BaseMediaList({
  className,
  media,
  listComponent: ListComponent,
  rowComponent: RowComponent,
  rowProps = {},
  contextProps,
  onRequestPage,
  // The `size` property is only necessary for lazy loading.
  size = media.length,
}) {
  const parentRef = useRef();
  const lastMediaRef = useRef(media);
  const [selection, setSelection] = useState(() => itemSelection(media));
  const inFlightPageRequests = useRef({});

  const context = useMemo(() => ({
    media,
    selection,
    ...contextProps,
  }), [media, selection, contextProps]);

  const itemKey = useCallback((index) => {
    if (media[index]) {
      const { _id: id, sourceType, sourceID } = media[index];
      return id ?? `${sourceType}:${sourceID}`;
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

  // Potentially interesting to explore is to virtualize entire PAGES at a time.
  // Then we render in batches of 50, which should be acceptable, and don't
  // rerender as frequently as now.
  const { virtualItems, totalSize } = useVirtual({
    size,
    parentRef,
    estimateSize,
    oversan: 6,
  });

  useEffect(() => {
    if (!onRequestPage) {
      return;
    }

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

    // This ends up only loading one page at a time, while we might have multiple pages visible.
    // For now this should be OK. Once the first page loads, we rerender, so this code is ran
    // again and the second page will be loaded at that point.
    const unloadedItem = virtualItems.find(({ index }) => !isItemLoaded(index));
    if (unloadedItem) {
      loadMoreItems(unloadedItem.index);
    }
  }, [virtualItems, media, onRequestPage]);

  const list = (
    <ListComponent style={{ height: `${totalSize}px`, width: '100%', position: 'relative' }}>
      {virtualItems.map(({ index, start, size: height }) => {
        const style = {
          position: 'absolute',
          top: 0,
          height,
          transform: `translateY(${start}px)`,
        };
        const selected = selection.isSelectedIndex(index);
        if (!media[index]) {
          return (
            <LoadingRow
              key={itemKey(index)}
              className="MediaList-row"
              style={style}
              selected={selected}
            />
          );
        }

        return (
          <RowComponent
            {...rowProps}
            key={itemKey(index)}
            style={style}
            className="MediaList-row"
            index={index}
            media={media[index]}
            selected={selected}
            onClick={(event) => selectItem(index, event)}
          />
        );
      })}
    </ListComponent>
  );

  return (
    <MediaListContext.Provider value={context}>
      <div className={cx('MediaList', className)} ref={parentRef}>
        {list}
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
