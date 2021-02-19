import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';
import emojiUrl from '../../../utils/emojiUrl';

const shortcode = (name) => `:${name}:`;

const Emoji = ({ name, image }) => (
  <Tooltip title={shortcode(name)} placement="top">
    <span className="Emoji" data-emoji={name}>
      <img
        className="Emoji-img"
        src={emojiUrl(image)}
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
