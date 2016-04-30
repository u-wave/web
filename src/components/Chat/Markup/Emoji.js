import * as React from 'react';

const Emoji = ({ name, image, ...props }) => (
  <span
    {...props}
    className="Emoji"
    style={{ backgroundImage: `url(/assets/emoji/${image})` }}
    data-emoji={name}
  >
    {`:${name}:`}
  </span>
);

Emoji.propTypes = {
  name: React.PropTypes.string.isRequired,
  image: React.PropTypes.string.isRequired
};

export default Emoji;
