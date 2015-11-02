import React from 'react';

const StrikeThrough = ({ children, ...props }) => <s {...props}>{children}</s>;

export default StrikeThrough;
