import { useCallback } from 'react';
import PreviewMediaDialog from '../components/Dialogs/PreviewMediaDialog';
import { useDispatch, useSelector } from '../hooks/useRedux';
import { closePreviewMediaDialog, previewMediaDialogSelector } from '../reducers/dialogs';
import { volumeSelector } from '../reducers/settings';

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
