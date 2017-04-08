import React from 'react';
import PropTypes from 'prop-types';
import pure from 'recompose/pure';

import compile from './Markup/compile';

const Motd = ({ children, compileOptions }) => (
  <div className="ChatMessage ChatMessage--motd">
    <div className="ChatMessage-content">
      {compile(children, compileOptions)}
    </div>
  </div>
);

Motd.propTypes = {
  children: PropTypes.array.isRequired,
  compileOptions: PropTypes.shape({
    availableEmoji: PropTypes.array,
    emojiImages: PropTypes.object
  })
};

export default pure(Motd);
