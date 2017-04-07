import React from 'react';
import PropTypes from 'prop-types';
import List from 'react-list';

import ImportPanelHeader from '../../components/PlaylistManager/Import/ImportPanelHeader';

import PlaylistRow from './PlaylistRow';

export default class ChannelPanel extends React.Component {
  static propTypes = {
    importingChannelTitle: PropTypes.string.isRequired,
    importablePlaylists: PropTypes.arrayOf(PropTypes.object).isRequired,

    onImportPlaylist: PropTypes.func.isRequired,
    onClosePanel: PropTypes.func.isRequired
  };

  renderRow = (index, key) => {
    const playlist = this.props.importablePlaylists[index];
    return (
      <PlaylistRow
        key={key}
        className={index % 2 === 0 ? 'MediaListRow--alternate' : ''}
        playlist={playlist}
        onImport={() => this.props.onImportPlaylist(playlist.sourceID, playlist.name)}
      />
    );
  };

  render() {
    const {
      importingChannelTitle,
      importablePlaylists,
      onClosePanel
    } = this.props;

    return (
      <div className="ImportPanel ChannelPanel">
        <ImportPanelHeader onClosePanel={onClosePanel}>
          {`${importingChannelTitle}'s Playlists`}
        </ImportPanelHeader>
        <div className="MediaList ImportPanel-body">
          <List
            type="uniform"
            length={importablePlaylists.length}
            itemRenderer={this.renderRow}
          />
        </div>
      </div>
    );
  }
}
