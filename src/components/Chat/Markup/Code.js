import * as React from 'react';

const Code = ({ children, ...props }) => <code {...props}>{children}</code>;

Code.propTypes = {
  children: React.PropTypes.node.isRequired
};

export default Code;
