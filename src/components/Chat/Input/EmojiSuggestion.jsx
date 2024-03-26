import cx from 'clsx';
import PropTypes from 'prop-types';
import { useSelector } from '../../../hooks/useRedux';
import emojiUrl from '../../../utils/emojiUrl';
import { customEmojiNamesSelector } from '../../../reducers/config';

const shortcode = (emoji) => `:${emoji.shortcode}:`;

function EmojiSuggestion({ value, select, selected }) {
  const customEmojiNames = useSelector(customEmojiNamesSelector);
  const isCustom = customEmojiNames.has(value.shortcode);
  const url = emojiUrl(value.image, isCustom);

  return (
    <button
      type="button"
      onClick={select}
      className={cx('SuggestionItem', selected && 'is-focused')}
    >
      <span
        className="SuggestionItem-icon EmojiSuggestion-image"
        style={{ backgroundImage: `url(${CSS.escape(url.href)})` }}
      />
      <span className="SuggestionItem-label">{shortcode(value)}</span>
    </button>
  );
}

EmojiSuggestion.propTypes = {
  value: PropTypes.shape({
    shortcode: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
  select: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
};

export default EmojiSuggestion;
