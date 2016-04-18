/* eslint-disable react/prefer-stateless-function */
import cx from 'classnames';
import * as React from 'react';
import ImportIcon from 'material-ui/svg-icons/action/input';

import Loader from '../../Loader';

export default class PlaylistImportRow extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    importing: React.PropTypes.bool,
    onClick: React.PropTypes.func.isRequired
  };

  render() {
    const { className, importing, onClick } = this.props;
    let icon;
    if (importing) {
      icon = (
        <div className="PlaylistMenuRow-loading">
          <Loader size="tiny" />
        </div>
      );
    } else {
      icon = (
        <div className="PlaylistMenuRow-active-icon">
          <ImportIcon color="#fff" />
        </div>
      );
    }
    return (
      <div
        role="menuitem"
        className={cx('PlaylistMenuRow', 'PlaylistMenuRow--import', className)}
        onClick={onClick}
      >
        <div className="PlaylistMenuRow-title">
          {icon}
          Import
        </div>
      </div>
    );
  }
}
/* eslint-enable react/prefer-stateless-function */
