import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { closePreviewMediaDialog } from '../actions/DialogActionCreators';

import { previewMediaDialogSelector as mapStateToProps } from '../selectors/dialogSelectors';
import PreviewMediaDialog from '../components/Dialogs/PreviewMediaDialog';

const mapDispatchToProps = dispatch => bindActionCreators({
  onCloseDialog: closePreviewMediaDialog,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PreviewMediaDialog);
