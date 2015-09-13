import assign from 'object-assign';
import cx from 'classnames';
import React from 'react';
import Volume from './Volume';

export default class HeaderBar extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    title: React.PropTypes.string
  }

  render() {
    const props = assign({}, this.props, {
      className: cx('HeaderBar', this.props.className)
    });
    return (
      <div {...props}>
        <h1 className="HeaderBar-title">{props.title}</h1>
        <Volume className="HeaderBar-volume" />
      </div>
    );
  }
}
