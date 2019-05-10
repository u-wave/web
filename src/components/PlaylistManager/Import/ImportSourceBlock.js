import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import injectMediaSources from '../../../utils/injectMediaSources';

const enhance = injectMediaSources();

const ImportSourceBlock = ({
  getMediaSource,
  className,
  sourceType,
  title,
  children,
}) => (
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

ImportSourceBlock.propTypes = {
  getMediaSource: PropTypes.func.isRequired,
  className: PropTypes.string,
  sourceType: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default enhance(ImportSourceBlock);
