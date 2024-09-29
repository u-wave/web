import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogCloseAnimation from '../../DialogCloseAnimation';
import PreviewPlayer from '../../Video/Player';
import type { Media } from '../../../reducers/booth';

function getTitle(media: Media) {
  return `${media.artist} – ${media.title}`;
}

type PreviewMediaDialogProps = {
  open: boolean,
  media?: Media | null,
  volume: number,
  onCloseDialog: () => void,
};
function PreviewMediaDialog({
  open,
  media,
  volume,
  onCloseDialog,
}: PreviewMediaDialogProps) {
  const dialog = open && media != null ? (
    <Dialog
      onClose={onCloseDialog}
      aria-label={getTitle(media)}
      open
      disableEnforceFocus
      maxWidth={false}
      classes={{
        root: 'AppColumn AppColumn--left',
        paper: 'Dialog PreviewMediaDialog',
      }}
      BackdropProps={{
        className: 'AppColumn AppColumn--left',
      }}
    >
      <DialogContent className="Dialog-body PreviewMediaDialog-content">
        <PreviewPlayer media={media} volume={volume} />
      </DialogContent>
    </Dialog>
  ) : null;

  return (
    <DialogCloseAnimation delay={450}>
      {dialog}
    </DialogCloseAnimation>
  );
}

export default PreviewMediaDialog;
