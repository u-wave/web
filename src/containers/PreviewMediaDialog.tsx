import { useCallback } from 'react';
import { useSelector, useDispatch } from '../hooks/useRedux';
import { closePreviewMediaDialog, previewMediaDialogSelector } from '../reducers/dialogs';
import { volumeSelector } from '../reducers/settings';
import PreviewMediaDialog from '../components/Dialogs/PreviewMediaDialog';

function PreviewMediaDialogContainer() {
  const { open, payload } = useSelector(previewMediaDialogSelector);
  const volume = useSelector(volumeSelector);
  const dispatch = useDispatch();
  const onCloseDialog = useCallback(() => dispatch(closePreviewMediaDialog()), [dispatch]);

  return (
    <PreviewMediaDialog
      open={open}
      {...payload}
      volume={volume}
      onCloseDialog={onCloseDialog}
    />
  );
}

export default PreviewMediaDialogContainer;
