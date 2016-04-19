import * as React from 'react';

import IconButton from 'material-ui/lib/icon-button';
import ImportIcon from 'material-ui/lib/svg-icons/av/playlist-add';

import MediaList from '../../components/MediaList';
import AddToPlaylistAction from '../../components/MediaList/Actions/AddToPlaylist';
import ImportPanelHeader from '../../components/PlaylistManager/Import/ImportPanelHeader';

const selectionOrOne = (media, selection) => {
  if (selection.isSelected(media)) {
    return selection.get();
  }
  return [ media ];
};

export default class YouTubeImportPlaylistPanel extends React.Component {
  static propTypes = {
    importingPlaylist: React.PropTypes.shape({
      sourceID: React.PropTypes.string,
      name: React.PropTypes.string
    }).isRequired,
    importingPlaylistItems: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,

    onImportPlaylist: React.PropTypes.func.isRequired,
    onOpenAddMediaMenu: React.PropTypes.func.isRequired,
    onClosePanel: React.PropTypes.func.isRequired
  };

  handleImportFull = () => {
    const {
      importingPlaylist,
      onImportPlaylist
    } = this.props;
    onImportPlaylist(importingPlaylist.sourceID, importingPlaylist.name);
  };

  render() {
    const {
      importingPlaylist,
      importingPlaylistItems,
      onOpenAddMediaMenu,
      onClosePanel
    } = this.props;

    return (
      <div className="PlaylistPanel yt-import-PlaylistPanel">
        <ImportPanelHeader onClosePanel={onClosePanel}>
          <div className="yt-import-PlaylistPanel-header">
            <div className="yt-import-PlaylistPanel-name">
              {importingPlaylist.name}
            </div>
            <IconButton
              onClick={this.handleImportFull}
              tooltip={`Import All (${importingPlaylistItems.length})`}
              tooltipPosition="top-center"
            >
              <ImportIcon color="#555" hoverColor="#fff" />
            </IconButton>
          </div>
        </ImportPanelHeader>
        <MediaList
          className="PlaylistPanel-media"
          media={importingPlaylistItems}
          makeActions={(media, selection) => [
            <AddToPlaylistAction
              key="add"
              onAdd={position => onOpenAddMediaMenu(selectionOrOne(media, selection), position)}
            />
          ]}
        />
      </div>
    );
  }
}
