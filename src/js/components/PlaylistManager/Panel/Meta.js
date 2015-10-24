import cx from 'classnames';
import React from 'react';
import ActiveIcon from 'material-ui/lib/svg-icons/toggle/check-box';
import ActivateIcon from 'material-ui/lib/svg-icons/toggle/check-box-outline-blank';
import { activatePlaylist } from '../../../actions/PlaylistActionCreators';

export default class PlaylistMeta extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    active: React.PropTypes.bool,
    name: React.PropTypes.string,
    id: React.PropTypes.string
  };

  activate() {
    activatePlaylist(this.props.id);
  }

  render() {
    const { className, active, name } = this.props;
    return (
      <div className={cx('PlaylistMeta', className, active ? 'PlaylistMeta--active' : '')}>
        <div className="PlaylistMeta-name">
          {name}
        </div>
        <div
          className="PlaylistMeta-active"
          onClick={::this.activate}
        >
          <div className="PlaylistMeta-active-icon">
            {active ? <ActiveIcon color="#fff" /> : <ActivateIcon color="#fff" />}
          </div>
          {active ? 'Active' : 'Activate'}
        </div>
      </div>
    );
  }
}
