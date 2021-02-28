import React from 'react';
import PropTypes from 'prop-types';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Suggestion from './Suggestion';
import emojiUrl from '../../../utils/emojiUrl';

const shortcode = (emoji) => `:${emoji.shortcode}:`;

function EmojiSuggestion({
  value: emoji,
  ...props
}) {
  const url = emojiUrl(emoji.image);

  return (
    <Suggestion {...props}>
      <ListItemAvatar>
        <span
          className="EmojiSuggestion-image"
          style={{ backgroundImage: `url(${CSS.escape(url)})` }}
        />
      </ListItemAvatar>
      <ListItemText primary={shortcode(emoji)} />
    </Suggestion>
  );
}

EmojiSuggestion.propTypes = {
  value: PropTypes.shape({
    shortcode: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
};

export default EmojiSuggestion;
