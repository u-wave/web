import cx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { MEDIA } from '../../constants/DDItemTypes';
import { useMediaListContext } from './BaseMediaList';

const {
  useCallback,
  useEffect,
} = React;

function MediaRowBase({
  className,
  style,
  media,
  onClick,
  children,
  ...props
}) {
  const { selection } = useMediaListContext();
  const selected = selection.isSelected(media);

  const [, drag, connectDragPreview] = useDrag({
    type: MEDIA,
    item: () => ({
      media: selected ? selection.get() : [media],
    }),
  });

  useEffect(() => {
    connectDragPreview(getEmptyImage());
  }, [connectDragPreview]);

  const handleKeyPress = useCallback((event) => {
    if (event.code === 'Space') {
      onClick();
    }
  }, [onClick]);

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
      ref={drag}
    >
      {children}
    </div>
  );
}

MediaRowBase.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object, // from react-window
  media: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
};

export default MediaRowBase;
