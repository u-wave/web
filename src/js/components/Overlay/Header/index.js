import cx from 'classnames';
import React from 'react';
import oneOrManyChildren from '../../../utils/propTypes/oneOrManyChildren';
import CloseButton from './Close';

export default class Header extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    title: React.PropTypes.string,
    children: oneOrManyChildren
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
