import cx from 'clsx';
import React from 'react';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { MEDIA } from '../../constants/DDItemTypes';
import { useMediaListContext } from './BaseMediaList';
import type { Media } from '../../reducers/booth';

const {
  useCallback,
  useEffect,
  useRef,
} = React;

type MediaRowBaseProps = {
  className?: string,
  style?: React.CSSProperties,
  dragType?: string,
  media: Media,
  children: React.ReactNode,
  onClick?: () => void,
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
  const selected = selection.isSelected(media);

  const localRef = useRef<HTMLDivElement>(null);
  const ref = containerRef ?? localRef;

  const [, drag, connectDragPreview] = useDrag({
    type: dragType,
    item: () => ({
      type: dragType,
      media: selected ? selection.get() : [media],
    }),
  });

  useEffect(() => {
    connectDragPreview(getEmptyImage());
  }, [connectDragPreview]);

  const handleKeyPress = useCallback((event: React.KeyboardEvent) => {
    if (event.code === 'Space') {
      onClick?.();
    }
  }, [onClick]);

  drag(ref);
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
