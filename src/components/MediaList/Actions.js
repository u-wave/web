/* eslint-disable react/prefer-stateless-function */
import cx from 'classnames';
import React from 'react';

const dontBubble = event => event.stopPropagation();

export default class Actions extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    media: React.PropTypes.object,
    selection: React.PropTypes.array,
    makeActions: React.PropTypes.func
  };

  render() {
    const { className, makeActions, media } = this.props;
    const actions = makeActions(media);
    return (
      <div
        className={cx('MediaActions', className)}
        onClick={dontBubble}
      >
        {actions}
      </div>
    );
  }
}
/* eslint-enable react/prefer-stateless-function */
