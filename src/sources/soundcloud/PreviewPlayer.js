import React from 'react';
import PropTypes from 'prop-types';

const createEmbedUrl = sourceID => `
  https://w.soundcloud.com/player/
  ?url=${encodeURIComponent(`https://api.soundcloud.com/tracks/${sourceID}`)}
  &color=55B9FF
  &auto_play=true
  &hide_related=true
  &buying=false
  &liking=false
  &download=false
  &sharing=false
  &show_comments=false
  &visual=true
`.replace(/\s+/g, '');

const PreviewPlayer = ({ media }) => (
  <iframe
    title="SoundCloud Embed"
    width="100%"
    height="240"
    scrolling="no"
    frameBorder="no"
    src={createEmbedUrl(media.sourceID)}
  />
);

PreviewPlayer.propTypes = {
  media: PropTypes.object.isRequired,
};

export default PreviewPlayer;
