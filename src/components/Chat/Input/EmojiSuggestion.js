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
      <span
        className="EmojiSuggestion-image"
        style={{ backgroundImage: `url(/assets/emoji/${emoji.image})` }}
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
