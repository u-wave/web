import * as React from 'react';

const Italic = ({ children, ...props }) => <i {...props}>{children}</i>;

Italic.propTypes = {
  children: React.PropTypes.node.isRequired
};

export default Italic;
