import cx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { useMediaSources } from '../../../context/MediaSourceContext';

function ImportSourceBlock({
  className,
  sourceType,
  title,
  children,
}) {
  const { getMediaSource } = useMediaSources();

  return (
    <div className={cx('ImportSourceBlock', 'PlaylistImport-source', className)}>
      <img
        className="ImportSourceBlock-image"
        alt={title}
        title={title}
        src={getMediaSource(sourceType).logo}
      />
      {children}
    </div>
  );
}

ImportSourceBlock.propTypes = {
  className: PropTypes.string,
  sourceType: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default ImportSourceBlock;
