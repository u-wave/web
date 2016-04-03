import * as React from 'react';

const Emoji = ({ name, ...props }) => (
  <span
    {...props}
    className="Emoji"
    style={{ backgroundImage: `url(/assets/emoji/${name}.png)` }}
    data-emoji={name}
  >
    {`:${name}:`}
  </span>
);

Emoji.propTypes = {
  name: React.PropTypes.string.isRequired
};

export default Emoji;
