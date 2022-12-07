import React from 'react';
import PropTypes from 'prop-types';
import shortenUrl from 'shorten-url';

const Link = ({ children, href, ...props }) => (
  <a
    href={href}
    title={href}
    target="_blank"
    rel="noopener noreferrer"
    {...props}
  >
    {shortenUrl(children, 60)}
  </a>
);

Link.propTypes = {
  children: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
};

export default Link;
