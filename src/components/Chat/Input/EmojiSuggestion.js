import React from 'react';
import PropTypes from 'prop-types';
import Suggestion from './Suggestion';

const EmojiSuggestion = ({
  value: emoji,
  ...props
}) => (
  <Suggestion
    {...props}
    value={emoji.shortcode}
    primaryText={`:${emoji.shortcode}:`}
    leftAvatar={
      <span
        className="EmojiSuggestion-image"
        style={{ backgroundImage: `url(/assets/emoji/${emoji.image})` }}
      />
    }
  />
);

EmojiSuggestion.propTypes = {
  value: PropTypes.shape({
    shortcode: PropTypes.string,
    image: PropTypes.string
  }).isRequired
};

export default EmojiSuggestion;
