import React from 'react';
import PropTypes from 'prop-types';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import { useSelector } from 'react-redux';
import Suggestion from './Suggestion';
import emojiUrl from '../../../utils/emojiUrl';
import { customEmojiNamesSelector } from '../../../selectors/configSelectors';

const shortcode = (emoji) => `:${emoji.shortcode}:`;

function EmojiSuggestion({
  value: emoji,
  ...props
}) {
  const customEmojiNames = useSelector(customEmojiNamesSelector);
  const isCustom = customEmojiNames.has(emoji.shortcode);
  const url = emojiUrl(emoji.image, isCustom);

  return (
    <Suggestion {...props}>
      <ListItemAvatar>
        <span
          className="EmojiSuggestion-image"
          style={{ backgroundImage: `url(${CSS.escape(url.href)})` }}
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
