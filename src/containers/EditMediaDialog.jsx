import React from 'react';
import { useSelector, useDispatch } from '../hooks/useRedux';
import { updateMedia } from '../actions/PlaylistActionCreators';
import { closeEditMediaDialog } from '../actions/DialogActionCreators';
import { editMediaDialogSelector } from '../selectors/dialogSelectors';
import EditMediaDialog from '../components/Dialogs/EditMediaDialog';
import DialogCloseAnimation from '../components/DialogCloseAnimation';

const DIALOG_ANIMATION_DURATION = 450; // ms

function EditMediaDialogContainer() {
  const dispatch = useDispatch();
  const { open, playlistID, media } = useSelector(editMediaDialogSelector);
  const onEditedMedia = (update) => dispatch(updateMedia(playlistID, media._id, update));
  const onCloseDialog = () => dispatch(closeEditMediaDialog());
  return (
    <DialogCloseAnimation delay={DIALOG_ANIMATION_DURATION}>
      {media && (
        <EditMediaDialog
          key={media._id}
          open={open}
          media={media}
          onEditedMedia={onEditedMedia}
          onCloseDialog={onCloseDialog}
        />
      )}
    </DialogCloseAnimation>
  );
}

export default EditMediaDialogContainer;
