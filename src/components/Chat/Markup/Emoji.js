import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from 'material-ui/Tooltip';

const shortcode = name =>
  `:${name}:`;
const url = filename =>
  `/assets/emoji/${filename}`;

const Emoji = ({ name, image }) => (
  <Tooltip title={shortcode(name)} placement="top">
    <span className="Emoji" data-emoji={name}>
      <img
        className="Emoji-img"
        src={url(image)}
        alt={shortcode(name)}
      />
    </span>
  </Tooltip>
);

Emoji.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default Emoji;
