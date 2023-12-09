import cx from 'clsx';
import React from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import itemSelection, { ItemSelection } from 'item-selection/immutable';
import LoadingRow from './LoadingRow';
import { Media } from '../../reducers/booth';

const {
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} = React;

interface Item {
  _id: string;
  sourceType?: string;
  sourceID?: string;
}

export type ContextType<
  MediaType extends Item = Media,
> = {
  media: (MediaType | null)[],
  selection: ItemSelection<MediaType | null>,
}
const MediaListContext = React.createContext<ContextType<Item> | null>(null);
export function useMediaListContext<T extends ContextType<Item> = ContextType<Media>>() {
  const context = useContext(MediaListContext);
  if (!context) {
    throw new Error('Missing MediaListContext');
  }
  return context as T;
}

/**
 * Check if two media lists are different, taking into account
 * pagination. If the new media list contains items where the previous
 * list doesn't, but every other item is identical, we assume
 * the new list has just loaded a page that wasn't loaded in the
 * previous one, and decide that the list is not really different.
 */
function didMediaChange(prev: (Item | null)[], next: (Item | null)[]) {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return prev.some((item, i) => item && next[i] && item._id !== next[i]!._id);
}

function estimateSize() {
  return 56;
}

type RowProps<MediaType extends Item = Media> = {
  style: React.CSSProperties,
  className: string,
  index: number,
  media: MediaType,
  selected: boolean,
  onClick: (event?: React.MouseEvent) => void,
}

export type BaseMediaListProps<MediaType extends Item = Media> = {
  className?: string,
  media: (MediaType | null)[],
  listComponent: React.ElementType<{ style: React.CSSProperties, children: React.ReactNode }>,
  rowComponent: React.ComponentType<RowProps<MediaType>>,
  contextProps?: object,
  onRequestPage?: (page: number) => Promise<void>,
  size?: number,
};
function BaseMediaList<MediaType extends Item = Media>({
  className,
  media,
  listComponent: ListComponent,
  rowComponent: RowComponent,
  contextProps,
  onRequestPage,
  // The `size` property is only necessary for lazy loading.
  size = media.length,
}: BaseMediaListProps<MediaType>) {
  const parentRef = useRef<HTMLDivElement>(null);
  const lastMediaRef = useRef(media);
  const [selection, setSelection] = useState(() => itemSelection(media));
  const inFlightPageRequests = useRef<Record<string, 1>>({});

  const context = useMemo(() => ({
    media,
    selection,
    ...contextProps,
  }), [media, selection, contextProps]);

  const itemKey = (index: number) => {
    const item = media[index];
    if (item) {
      const { _id: id, sourceType, sourceID } = item;
      return id ?? `${sourceType}:${sourceID}`;
    }
    return `unloaded_${index}`;
  };

  useEffect(() => {
    const lastMedia = lastMediaRef.current;
    if (lastMedia !== media) {
      lastMediaRef.current = media;
      const selectedIndices = selection.getIndices();
      const mediaChanged = didMediaChange(lastMedia, media);
      setSelection(mediaChanged ? itemSelection(media) : itemSelection(media, selectedIndices));
    }
  }, [media, selection]);

  const selectItem = (index: number, event: React.MouseEvent) => {
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
  };

  // Potentially interesting to explore is to virtualize entire PAGES at a time.
  // Then we render in batches of 50, which should be acceptable, and don't
  // rerender as frequently as now.
  const virtualizer = useVirtualizer({
    count: size,
    getScrollElement: () => parentRef.current,
    estimateSize,
    overscan: 6,
  });
  const virtualItems = virtualizer.getVirtualItems();

  useEffect(() => {
    if (!onRequestPage) {
      return;
    }

    const isItemLoaded = (index: number) => media[index] != null;
    const loadMoreItems = (start: number) => {
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
    <ListComponent style={{ height: `${virtualizer.getTotalSize()}px`, width: '100%', position: 'relative' }}>
      {virtualItems.map(({ index, start }) => {
        const item = media[index];
        const style = { transform: `translateY(${start}px)` };
        const selected = selection.isSelectedIndex(index);
        if (!item) {
          return (
            <LoadingRow
              key={itemKey(index)}
              className="MediaList-row"
              style={style}
            />
          );
        }

        return (
          <RowComponent
            key={itemKey(index)}
            style={style}
            className="MediaList-row"
            index={index}
            media={item}
            selected={selected}
            onClick={(event?: React.MouseEvent) => event && selectItem(index, event)}
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

export default BaseMediaList;
