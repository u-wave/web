import React from 'react';
import { useSelector, useDispatch } from '../hooks/useRedux';
import { previewMediaDialogSelector } from '../reducers/dialogs';
import { volumeSelector } from '../reducers/settings';
import { closePreviewMediaDialog } from '../actions/DialogActionCreators';
import PreviewMediaDialog from '../components/Dialogs/PreviewMediaDialog';

const {
  useCallback,
} = React;

function PreviewMediaDialogContainer() {
  const props = useSelector(previewMediaDialogSelector);
  const volume = useSelector(volumeSelector);
  const dispatch = useDispatch();
  const onCloseDialog = useCallback(() => dispatch(closePreviewMediaDialog()), [dispatch]);

  return (
    <PreviewMediaDialog
      {...props}
      volume={volume}
      onCloseDialog={onCloseDialog}
    />
  );
}

export default PreviewMediaDialogContainer;
