import * as React from 'react';
import truncate from 'truncate-url';

const Link = ({ text, href, ...props }) => (
  <a href={href} title={href} target="_blank" {...props}>
    {truncate(text, 60)}
  </a>
);

Link.propTypes = {
  text: React.PropTypes.string.isRequired,
  href: React.PropTypes.string.isRequired
};

export default Link;
