import * as React from 'react';
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
      <img
        alt=""
        className="Emoji"
        src={`/assets/emoji/${emoji.image}`}
        width={24}
        height={24}
      />
    }
  />
);

EmojiSuggestion.propTypes = {
  value: React.PropTypes.shape({
    shortcode: React.PropTypes.string,
    image: React.PropTypes.string
  }).isRequired
};

export default EmojiSuggestion;
