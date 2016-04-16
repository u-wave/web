import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  addMediaMenu as openAddMediaMenu
} from '../../../../actions/PlaylistActionCreators';

import MediaList from '../../../MediaList';
import AddToPlaylistAction from '../../../MediaList/Actions/AddToPlaylist';
import ImportPanelHeader from '../ImportPanelHeader';

const selectionOrOne = (media, selection) => {
  if (selection.isSelected(media)) {
    return selection.get();
  }
  return [ media ];
};

const mapStateToProps = () => ({
  // nothing
});

const mapDispatchToProps = dispatch => bindActionCreators({
  onOpenAddMediaMenu: openAddMediaMenu
}, dispatch);

@connect(mapStateToProps, mapDispatchToProps)
export default class YouTubeImportPlaylistPanel extends React.Component {
  static propTypes = {
    importingPlaylistItems: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,

    onOpenAddMediaMenu: React.PropTypes.func.isRequired,
    onClosePanel: React.PropTypes.func.isRequired
  };

  handleImportFull = () => {
  };

  handleAddToPlaylist = (position, media, selection) => {
    console.log(position, media, selection);
  };

  render() {
    const {
      importingPlaylistItems,
      onOpenAddMediaMenu,
      onClosePanel
    } = this.props;

    return (
      <div className="PlaylistPanel SearchResults">
        <ImportPanelHeader
          className="SearchResults-query"
          onClosePanel={onClosePanel}
        >
          YouTube Playlist
          <a onClick={this.handleImportFull}>
            Import All ({importingPlaylistItems.length})
          </a>
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
