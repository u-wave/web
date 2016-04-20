import * as React from 'react';

const Bold = ({ children, ...props }) => <b {...props}>{children}</b>;

Bold.propTypes = {
  children: React.PropTypes.node.isRequired
};

export default Bold;
