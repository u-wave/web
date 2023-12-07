import cx from 'clsx';
import React from 'react';
import { useAsyncCallback } from 'react-async-hook';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import CircularProgress from '@mui/material/CircularProgress';
import Form from '../../Form';
import FormGroup from '../../Form/Group';
import Button from '../../Form/Button';

/**
 * @param {object} props
 * @param {string} [props.className]
 * @param {React.ReactNode} [props.children]
 * @param {boolean} props.open
 * @param {string} [props.cancelLabel]
 * @param {string} [props.confirmLabel]
 * @param {() => Promise<void> | undefined} props.onConfirm
 * @param {() => void} props.onCancel
 */
function ConfirmDialog({
  className,
  children,
  open,
  cancelLabel = 'Cancel',
  confirmLabel = 'OK',
  onConfirm,
  onCancel,
}) {
  const handleConfirm = useAsyncCallback(async (event) => {
    event.preventDefault();
    await onConfirm();
  }, [onConfirm]);

  const handleClose = (event) => {
    event.preventDefault();
    onCancel();
  };

  const handleSubmit = (event) => {
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
