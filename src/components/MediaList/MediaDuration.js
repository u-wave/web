import formatDuration from 'format-duration';
import PropTypes from 'prop-types';

function MediaDuration({ media }) {
  const duration = 'start' in media
    // playlist item
    ? media.end - media.start
    // search result
    : media.duration;

  return formatDuration(duration * 1000);
}

MediaDuration.propTypes = {
  media: PropTypes.shape({
    start: PropTypes.number,
    end: PropTypes.number,
    duration: PropTypes.number,
  }).isRequired,
};

export default MediaDuration;
