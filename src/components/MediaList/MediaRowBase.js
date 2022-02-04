import cx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { useMediaListContext } from './BaseMediaList';

const {
  useCallback,
  useRef,
} = React;

function MediaRowBase({
  className,
  style,
  media,
  onClick,
  children,
  containerRef,
  ...props
}) {
  const { selection } = useMediaListContext();
  const selected = selection.isSelected(media);

  const localRef = useRef();
  const ref = containerRef || localRef;

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
      ref={ref}
    >
      {children}
    </div>
  );
}

MediaRowBase.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object, // from react-window
  dragType: PropTypes.string,
  media: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
  containerRef: PropTypes.any,
};

export default MediaRowBase;
