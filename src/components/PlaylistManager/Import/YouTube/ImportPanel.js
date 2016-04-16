import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { IDLE, LOADING, LOADED } from '../../../../constants/LoadingStates';
import Loader from '../../../Loader';
import ImportPanelHeader from '../ImportPanelHeader';

import { importPlaylist } from './actions';
import ChannelPanel from './ChannelPanel';
import PlaylistPanel from './PlaylistPanel';

const mapStateToProps = () => ({});
const mapDispatchToProps = dispatch => bindActionCreators({
  onImportPlaylist: importPlaylist
}, dispatch);

@connect(mapStateToProps, mapDispatchToProps)
export default class YouTubeImportPanel extends React.Component {
  static propTypes = {
    type: React.PropTypes.oneOf([ 'youtube/import/PLAYLIST', 'youtube/import/CHANNEL' ]).isRequired,
    importingState: React.PropTypes.oneOf([ IDLE, LOADING, LOADED ]),

    onClosePanel: React.PropTypes.func.isRequired,
    onImportPlaylist: React.PropTypes.func.isRequired
  };

  render() {
    const {
      type,
      importingState,
      ...props
    } = this.props;

    if (importingState === LOADED) {
      if (type === 'youtube/import/PLAYLIST') {
        return <PlaylistPanel {...props} />;
      }
      return <ChannelPanel {...props} />;
    }
    return (
      <div className="PlaylistPanel">
        <ImportPanelHeader onClosePanel={this.props.onClosePanel} />
        <div className="PlaylistPanel-loading">
          <Loader size="large" />
        </div>
      </div>
    );
  }
}
