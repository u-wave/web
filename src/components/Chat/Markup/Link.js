import * as React from 'react';
import truncate from 'truncate-url';

const Link = ({ children, href, ...props }) => (
  <a
    href={href}
    title={href}
    target="_blank"
    rel="noopener noreferrer"
    {...props}
  >
    {truncate(children, 60)}
  </a>
);

Link.propTypes = {
  children: React.PropTypes.string.isRequired,
  href: React.PropTypes.string.isRequired
};

export default Link;
