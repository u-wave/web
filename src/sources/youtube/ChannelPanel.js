import React from 'react';
import PropTypes from 'prop-types';
import { FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import ImportPanelHeader from '../../components/PlaylistManager/Import/ImportPanelHeader';
import PlaylistRow from './PlaylistRow';

export default class ChannelPanel extends React.Component {
  static propTypes = {
    importingChannelTitle: PropTypes.string.isRequired,
    importablePlaylists: PropTypes.arrayOf(PropTypes.object).isRequired,

    onImportPlaylist: PropTypes.func.isRequired,
    onClosePanel: PropTypes.func.isRequired,
  };

  renderRow = ({ index, style }) => {
    const { importablePlaylists, onImportPlaylist } = this.props;

    const playlist = importablePlaylists[index];
    return (
      <PlaylistRow
        key={playlist.sourceID}
        className={index % 2 === 0 ? 'MediaListRow--alternate' : ''}
        style={style}
        playlist={playlist}
        onImport={() => onImportPlaylist(playlist.sourceID, playlist.name)}
      />
    );
  };

  render() {
    const {
      importingChannelTitle,
      importablePlaylists,
      onClosePanel,
    } = this.props;

    const renderList = ({ height }) => (
      <FixedSizeList
        height={height}
        itemCount={importablePlaylists.length}
        itemSize={56}
      >
        {this.renderRow}
      </FixedSizeList>
    );

    return (
      <div className="ImportPanel ChannelPanel">
        <ImportPanelHeader onClosePanel={onClosePanel}>
          {`${importingChannelTitle}'s Playlists`}
        </ImportPanelHeader>
        <div className="MediaList ImportPanel-body">
          <AutoSizer disableWidth>
            {renderList}
          </AutoSizer>
        </div>
      </div>
    );
  }
}
