import cx from 'clsx';
import React, { useMemo } from 'react';
import { draggable } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { pointerOutsideOfPreview } from '@atlaskit/pragmatic-drag-and-drop/element/pointer-outside-of-preview';
import { setCustomNativeDragPreview } from '@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview';
import { createRoot } from 'react-dom/client';
import { MEDIA } from '../../constants/DDItemTypes';
import { useMediaListContext } from './BaseMediaList';
import type { Media } from '../../reducers/booth';
import MediaDragPreview from './MediaDragPreview';

const {
  useCallback,
  useEffect,
  useRef,
} = React;

function renderDragPreview(container: HTMLElement, count: number) {
  const root = createRoot(container);
  root.render(<MediaDragPreview count={count} />);
  return () => root.unmount();
}

interface MediaRowBaseProps extends React.ComponentProps<'div'> {
  className?: string,
  style?: React.CSSProperties,
  dragType?: string,
  media: Media,
  children: React.ReactNode,
  onClick?: (event?: React.MouseEvent) => void,
  containerRef?: React.RefObject<HTMLDivElement>,
}
function MediaRowBase({
  className,
  style,
  dragType = MEDIA,
  media,
  onClick,
  children,
  containerRef,
  ...props
}: MediaRowBaseProps) {
  const { selection } = useMediaListContext();

  const localRef = useRef<HTMLDivElement>(null);
  const ref = containerRef ?? localRef;

  const handleKeyPress = useCallback((event: React.KeyboardEvent) => {
    if (event.code === 'Space') {
      onClick?.();
    }
  }, [onClick]);

  const mediaForDrag = useMemo(() => {
    return selection.isSelected(media) ? selection.get() : [media];
  }, [selection, media]);
  useEffect(() => {
    if (ref.current == null) return undefined;

    return draggable({
      element: ref.current,
      getInitialData: () => {
        return { type: dragType, media: mediaForDrag };
      },
      onGenerateDragPreview: ({ nativeSetDragImage }) => {
        setCustomNativeDragPreview({
          getOffset: pointerOutsideOfPreview({ x: '0px', y: '0px' }),
          render: ({ container }) => renderDragPreview(container, mediaForDrag.length),
          nativeSetDragImage,
        });
      },
    });
  }, [dragType, mediaForDrag, ref]);

  const selected = selection.isSelected(media);
  return (
    <div
      role="checkbox"
      aria-checked={selected}
      tabIndex={0}
      className={cx('MediaListRow', className, selected && 'is-selected')}
      style={style}
      onKeyPress={handleKeyPress}
      onClick={onClick}
      {...props}
      ref={ref}
    >
      {children}
    </div>
  );
}

export default MediaRowBase;
