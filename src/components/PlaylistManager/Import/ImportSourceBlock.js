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

export default ImportSourceBlock;
