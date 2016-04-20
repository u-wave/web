import * as React from 'react';

const Emoji = ({ name }) => <span>:{name}:</span>;

Emoji.propTypes = {
  name: React.PropTypes.string.isRequired
};

export default Emoji;
