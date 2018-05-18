import React from 'react';
import PropTypes from 'prop-types';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Suggestion from './Suggestion';

const shortcode = emoji => `:${emoji.shortcode}:`;

const EmojiSuggestion = ({
  value: emoji,
  ...props
}) => (
  <Suggestion {...props}>
    <ListItemAvatar>
      <span
        className="EmojiSuggestion-image"
        style={{ backgroundImage: `url(/assets/emoji/${emoji.image})` }}
      />
    </ListItemAvatar>
    <ListItemText primary={shortcode(emoji)} />
  </Suggestion>
);

EmojiSuggestion.propTypes = {
  value: PropTypes.shape({
    shortcode: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
};

export default EmojiSuggestion;
