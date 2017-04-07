import React from 'react';
import PropTypes from 'prop-types';
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
  children: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired
};

export default Link;
