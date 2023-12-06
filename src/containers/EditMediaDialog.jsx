import { useSelector, useDispatch } from '../hooks/useRedux';
import { updatePlaylistItem } from '../reducers/playlists';
import { closeEditMediaDialog } from '../actions/DialogActionCreators';
import { editMediaDialogSelector } from '../selectors/dialogSelectors';
import EditMediaDialog from '../components/Dialogs/EditMediaDialog';
import DialogCloseAnimation from '../components/DialogCloseAnimation';

const DIALOG_ANIMATION_DURATION = 450; // ms

function EditMediaDialogContainer() {
  const dispatch = useDispatch();
  const { open, playlistID, media } = useSelector(editMediaDialogSelector);
  const onEditedMedia = (props) => {
    return dispatch(updatePlaylistItem({ playlistID, mediaID: media._id, props }));
  };
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
