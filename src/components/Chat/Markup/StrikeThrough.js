import * as React from 'react';

const StrikeThrough = ({ children, ...props }) => <s {...props}>{children}</s>;

StrikeThrough.propTypes = {
  children: React.PropTypes.node.isRequired
};

export default StrikeThrough;
