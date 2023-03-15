import React from 'react';
import { useSelector, useDispatch } from '../hooks/useRedux';
import { closePreviewMediaDialog } from '../actions/DialogActionCreators';
import { previewMediaDialogSelector } from '../selectors/dialogSelectors';
import PreviewMediaDialog from '../components/Dialogs/PreviewMediaDialog';

const {
  useCallback,
} = React;

function PreviewMediaDialogContainer() {
  const props = useSelector(previewMediaDialogSelector);
  const dispatch = useDispatch();
  const onCloseDialog = useCallback(() => dispatch(closePreviewMediaDialog()), [dispatch]);

  return <PreviewMediaDialog {...props} onCloseDialog={onCloseDialog} />;
}

export default PreviewMediaDialogContainer;
