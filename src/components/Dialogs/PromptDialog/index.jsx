import cx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { useAsyncCallback } from 'react-async-hook';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import CircularProgress from '@mui/material/CircularProgress';
import Form from '../../Form';
import FormGroup from '../../Form/Group';
import TextField from '../../Form/TextField';
import Button from '../../Form/Button';

const {
  useCallback,
  useId,
  useState,
} = React;

/**
 * @param {object} props
 * @param {React.ReactNode} [props.children]
 * @param {React.ReactNode} [props.icon]
 * @param {string} [props.inputType]
 * @param {string} [props.placeholder]
 * @param {string} [props.submitLabel]
 * @param {string} props.title
 * @param {string} [props.bodyClassName]
 * @param {string} [props.contentClassName]
 * @param {string} [props.titleClassName]
 * @param {(value: string) => Promise<void> | undefined} props.onSubmit
 * @param {() => void} props.onCancel
 * @param {boolean} props.open
 * @param {string} [props.defaultValue]
 */
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
}) {
  const ariaTitle = useId();
  const [value, setValue] = useState(defaultValue);

  const handleSubmit = useAsyncCallback(async (event) => {
    event.preventDefault();
    await onSubmit(value);
  }, [value, onSubmit]);

  const handleClose = useCallback(() => {
    onCancel();
  }, [onCancel]);

  const handleInputChange = useCallback((event) => {
    setValue(event.target.value);
  }, []);

  return (
    <Dialog
      variant="fullWidth"
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
