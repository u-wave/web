import * as React from 'react';
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
  children: React.PropTypes.array.isRequired,
  compileOptions: React.PropTypes.shape({
    availableEmoji: React.PropTypes.array,
    emojiImages: React.PropTypes.object
  })
};

export default pure(Motd);
