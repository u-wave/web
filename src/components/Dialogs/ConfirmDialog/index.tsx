/* eslint-disable react/prop-types */
import cx from 'clsx';
import { useAsyncCallback } from 'react-async-hook';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import CircularProgress from '@mui/material/CircularProgress';
import Form from '../../Form';
import FormGroup from '../../Form/Group';
import Button from '../../Form/Button';

type ConfirmDialogProps = {
  className?: string,
  children?: React.ReactNode,
  open: boolean,
  cancelLabel?: string,
  confirmLabel?: string,
  onConfirm: () => Promise<void> | undefined,
  onCancel: () => void,
};
function ConfirmDialog({
  className,
  children,
  open,
  cancelLabel = 'Cancel',
  confirmLabel = 'OK',
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const handleConfirm = useAsyncCallback(async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    await onConfirm();
  });

  const handleClose = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    onCancel();
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <Dialog
      className={cx('Dialog', className)}
      onClose={onCancel}
      open={open}
    >
      <DialogContent className="Dialog-body">
        <Form onSubmit={handleSubmit}>
          {children}
          <FormGroup className="ConfirmDialog-buttons FormGroup--noSpacing">
            <div className="ConfirmDialog-button">
              <Button disabled={handleConfirm.loading} onClick={handleClose}>
                {cancelLabel}
              </Button>
            </div>
            <div className="ConfirmDialog-spacer" />
            <div className="ConfirmDialog-button">
              <Button disabled={handleConfirm.loading} onClick={handleConfirm.execute}>
                {handleConfirm.loading ? <div className="Button-loading"><CircularProgress size="100%" /></div> : confirmLabel}
              </Button>
            </div>
          </FormGroup>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default ConfirmDialog;
