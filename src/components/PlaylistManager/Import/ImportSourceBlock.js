import * as React from 'react';

const ImportSourceBlock = ({
  sourceType, title,
  children
}) => (
  <div className="ImportSourceBlock PlaylistImport-source">
    <img
      className="ImportSourceBlock-image"
      alt={title}
      title={title}
      src={`assets/img/${sourceType}.png`}
    />
    {children}
  </div>
);

ImportSourceBlock.propTypes = {
  sourceType: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  children: React.PropTypes.node.isRequired
};

export default ImportSourceBlock;
