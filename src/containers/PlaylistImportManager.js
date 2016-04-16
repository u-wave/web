import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  showImportSourcePanel,
  hideImportSourcePanel
} from '../actions/ImportActionCreators';
import PlaylistImport from '../components/PlaylistManager/Import';

const mapStateToProps = state => ({
  selectedSourceType: state.imports.sourceType,
  sourceStates: Object.keys(state.imports)
    .filter(sourceType => typeof state.imports[sourceType] === 'object')
    .reduce((states, sourceType) => ({
      ...states,
      [sourceType]: state.imports[sourceType]
    }), {})
});

const mapDispatchToProps = dispatch => bindActionCreators({
  onShowImportPanel: showImportSourcePanel,
  onHideImportPanel: hideImportSourcePanel
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistImport);
