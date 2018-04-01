import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from 'material-ui/Tooltip';
import IconButton from 'material-ui/IconButton';
import ImportIcon from 'material-ui-icons/PlaylistAdd';
import MediaList from '../../components/MediaList';
import AddToPlaylistAction from '../../components/MediaList/Actions/AddToPlaylist';
import ImportPanelHeader from '../../components/PlaylistManager/Import/ImportPanelHeader';

const selectionOrOne = (media, selection) => {
  if (selection.isSelected(media)) {
    return selection.get();
  }
  return [media];
};

export default class YouTubeImportPlaylistPanel extends React.Component {
  static propTypes = {
    importingPlaylist: PropTypes.shape({
      sourceID: PropTypes.string,
      name: PropTypes.string,
    }).isRequired,
    importingPlaylistItems: PropTypes.arrayOf(PropTypes.object).isRequired,

    onImportPlaylist: PropTypes.func.isRequired,
    onOpenAddMediaMenu: PropTypes.func.isRequired,
    onClosePanel: PropTypes.func.isRequired,
  };

  handleImportFull = () => {
    const {
      importingPlaylist,
      onImportPlaylist,
    } = this.props;
    onImportPlaylist(importingPlaylist.sourceID, importingPlaylist.name);
  };

  render() {
    const {
      importingPlaylist,
      importingPlaylistItems,
      onOpenAddMediaMenu,
      onClosePanel,
    } = this.props;

    return (
      <div className="ImportPanel src-youtube-PlaylistPanel">
        <ImportPanelHeader onClosePanel={onClosePanel}>
          <div className="src-youtube-PlaylistPanel-header">
            <div className="src-youtube-PlaylistPanel-name">
              {importingPlaylist.name}
            </div>
            <Tooltip title={`Import All (${importingPlaylistItems.length})`} placement="top">
              <IconButton onClick={this.handleImportFull}>
                <ImportIcon className="src-youtube-PlaylistPanel-importIcon" />
              </IconButton>
            </Tooltip>
          </div>
        </ImportPanelHeader>
        <MediaList
          className="ImportPanel-body"
          media={importingPlaylistItems}
          makeActions={(media, selection) => (
            <React.Fragment>
              <AddToPlaylistAction
                key="add"
                onAdd={position => onOpenAddMediaMenu(selectionOrOne(media, selection), position)}
              />
            </React.Fragment>
          )}
        />
      </div>
    );
  }
}
