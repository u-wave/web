import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  showImportSourcePanel,
  hideImportSourcePanel,
} from '../actions/ImportActionCreators';
import { selectedSourceTypeSelector } from '../selectors/importSelectors';
import PlaylistImport from '../components/PlaylistManager/Import';

const mapStateToProps = createStructuredSelector({
  selectedSourceType: selectedSourceTypeSelector,
  sourceStates: state => state.sources,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  onShowImportPanel: showImportSourcePanel,
  onHideImportPanel: hideImportSourcePanel,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistImport);
