/* eslint-disable react/prop-types */
import cx from 'clsx';
import { useCallback, useId, useState } from 'react';
import { useAsyncCallback } from 'react-async-hook';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import CircularProgress from '@mui/material/CircularProgress';
import Form from '../../Form';
import FormGroup from '../../Form/Group';
import TextField from '../../Form/TextField';
import Button from '../../Form/Button';

type PromptDialogProps = {
  children?: React.ReactNode,
  icon?: React.ReactNode,
  inputType?: string,
  placeholder?: string,
  submitLabel?: string,
  title: string,
  bodyClassName?: string,
  contentClassName?: string,
  titleClassName?: string,
  onSubmit: (value: string) => Promise<void> | undefined,
  onCancel: () => void,
  open: boolean,
  defaultValue?: string,
};
function PromptDialog({
  children,
  icon,
  inputType = 'text',
  placeholder,
  submitLabel = 'OK',
  title,
  bodyClassName,
  contentClassName,
  titleClassName,
  onSubmit,
  onCancel,
  open,
  defaultValue = '',
  ...props
}: PromptDialogProps) {
  const ariaTitle = useId();
  const [value, setValue] = useState(defaultValue);

  const handleSubmit = useAsyncCallback(async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await onSubmit(value);
  });

  const handleClose = useCallback(() => {
    onCancel();
  }, [onCancel]);

  const handleInputChange = useCallback((event: React.FormEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);
  }, []);

  return (
    <Dialog
      {...props}
      open={open}
      classes={{
        paper: cx('Dialog', contentClassName),
      }}
      onClose={handleClose}
      aria-labelledby={ariaTitle}
    >
      <DialogTitle className={cx('Dialog-title', titleClassName)} id={ariaTitle}>
        {title}
      </DialogTitle>
      <DialogContent className={cx('Dialog-body', bodyClassName)}>
        <Form onSubmit={handleSubmit.execute}>
          {children}
          <FormGroup>
            <TextField
              autoFocus
              type={inputType}
              placeholder={placeholder}
              icon={icon}
              value={value}
              onChange={handleInputChange}
              onKeyDown={(e) => e.stopPropagation()}
            />
          </FormGroup>
          <FormGroup>
            <Button disabled={handleSubmit.loading}>
              {handleSubmit.loading ? <div className="Button-loading"><CircularProgress size="100%" /></div> : submitLabel}
            </Button>
          </FormGroup>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default PromptDialog;
