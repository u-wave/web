import cx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from '@mui/material/Tooltip';
import emojiUrl from '../../../utils/emojiUrl';

const shortcode = (name) => `:${name}:`;

function Emoji({
  name,
  image,
  isCustom,
  isLarge = false,
}) {
  return (
    <Tooltip title={shortcode(name)} placement="top">
      <span className={cx('Emoji', isLarge && 'Emoji--large', isCustom && 'Emoji--custom')} data-emoji={name}>
        <img
          className="Emoji-img"
          src={emojiUrl(image, isCustom).href}
          alt={shortcode(name)}
        />
      </span>
    </Tooltip>
  );
}

Emoji.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  isCustom: PropTypes.bool.isRequired,
  isLarge: PropTypes.bool,
};

export default Emoji;
