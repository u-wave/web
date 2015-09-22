import cx from 'classnames';
import React from 'react';
import CloseButton from './Close';

export default class Header extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    title: React.PropTypes.string,
    children: React.PropTypes.arrayOf(React.PropTypes.element)
  };

  render() {
    const { className, title, children } = this.props;

    return (
      <div className={cx('OverlayHeader', className)}>
        <div className="OverlayHeader-title">
          {title.toUpperCase()}
        </div>
        <div className="OverlayHeader-content">
          {children}
        </div>
        <CloseButton className="OverlayHeader-close" />
      </div>
    );
  }
}
