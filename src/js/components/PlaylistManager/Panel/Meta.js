import cx from 'classnames';
import React from 'react';
import { setActivePlaylist } from '../../../actions/PlaylistActionCreators';
import Icon from '../../Icon';

export default class PlaylistMeta extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    active: React.PropTypes.bool,
    name: React.PropTypes.string,
    id: React.PropTypes.string
  };

  activate() {
    setActivePlaylist(this.props.id);
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
          <Icon
            className="PlaylistMeta-active-icon"
            name={active ? 'check_box' : 'check_box_outline_blank'}
          />
          {active ? 'Active' : 'Activate'}
        </div>
      </div>
    );
  }
}
