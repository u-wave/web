import cx from 'classnames';
import React from 'react';
import { closeAll } from '../../../actions/OverlayActionCreators';
import Icon from '../../Icon';

export default class Close extends React.Component {
  static propTypes = {
    className: React.PropTypes.string
  };

  render() {
    const { className } = this.props;

    return (
      <div
        className={cx('OverlayHeaderClose', className)}
        onClick={closeAll}
      >
        <Icon
          className="OverlayHeaderClose-icon"
          name="keyboard_arrow_down"
        />
      </div>
    );
  }
}
