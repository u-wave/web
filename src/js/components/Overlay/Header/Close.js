import cx from 'classnames';
import React from 'react';
import CloseIcon from 'material-ui/lib/svg-icons/hardware/keyboard-arrow-down';
import { closeAll } from '../../../actions/OverlayActionCreators';

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
        <CloseIcon
          color="#fff"
          style={{ height: 32, width: 32, padding: 12 }}
          className="OverlayHeaderClose-icon"
        />
      </div>
    );
  }
}
