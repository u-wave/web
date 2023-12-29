import { useSelector, useDispatch } from '../hooks/useRedux';
import { closeEditMediaDialog, editMediaDialogSelector } from '../reducers/dialogs';
import { updatePlaylistItem } from '../reducers/playlists';
import EditMediaDialog from '../components/Dialogs/EditMediaDialog';
import DialogCloseAnimation from '../components/DialogCloseAnimation';

const DIALOG_ANIMATION_DURATION = 450; // ms

function EditMediaDialogContainer() {
  const dispatch = useDispatch();
  const { open, payload } = useSelector(editMediaDialogSelector);
  const { playlistID, media } = payload ?? {};

  return (
    <DialogCloseAnimation delay={DIALOG_ANIMATION_DURATION}>
      {media && (
        <EditMediaDialog
          key={media._id}
          open={open}
          media={media}
          onEditedMedia={(props) => {
            return dispatch(updatePlaylistItem({
              playlistID: playlistID!,
              mediaID: media._id,
              props,
            }));
          }}
          onCloseDialog={() => dispatch(closeEditMediaDialog())}
        />
      )}
    </DialogCloseAnimation>
  );
}

export default EditMediaDialogContainer;
