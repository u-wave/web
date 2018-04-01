import React from 'react';
import PropTypes from 'prop-types';
import { ListItemAvatar, ListItemText } from 'material-ui/List';
import Suggestion from './Suggestion';

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
    <ListItemText>
      :{emoji.shortcode}:
    </ListItemText>
  </Suggestion>
);

EmojiSuggestion.propTypes = {
  value: PropTypes.shape({
    shortcode: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
};

export default EmojiSuggestion;
