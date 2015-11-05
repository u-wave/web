import React from 'react';
import truncate from 'truncate-url';

const Link = ({ text, href, ...props }) => (
  <a href={href} title={href} target="_blank" {...props}>
    {truncate(text, 60)}
  </a>
);

export default Link;
