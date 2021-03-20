import cx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import { nanoid } from 'nanoid/non-secure';
import Form from '../../Form';
import FormGroup from '../../Form/Group';
import TextField from '../../Form/TextField';
import Button from '../../Form/Button';

export default class PromptDialog extends React.Component {
  ariaTitle = nanoid();

  static propTypes = {
    children: PropTypes.node,
    placeholder: PropTypes.string,
    submitLabel: PropTypes.string,
    inputType: PropTypes.string,
    icon: PropTypes.node,
    value: PropTypes.string,
    title: PropTypes.string,
    open: PropTypes.bool,

    bodyClassName: PropTypes.string,
    contentClassName: PropTypes.string,
    titleClassName: PropTypes.string,

    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
  };

  static defaultProps = {
    submitLabel: 'OK',
    inputType: 'text',
    open: true,
  };

  constructor(props) {
    super(props);

    const { value } = this.props;
    this.state = {
      busy: false,
      value: value || '',
    };
  }

  handleSubmit = (event) => {
    const { onSubmit } = this.props;
    const { value } = this.state;

    event.preventDefault();
    const promise = onSubmit(value);
    if (promise && promise.finally) {
      this.setState({ busy: true });
      promise.finally(() => {
        this.setState({ busy: false });
      });
    }
  };

  handleClose = () => {
    const { onCancel } = this.props;

    onCancel();
  };

  handleInputChange = (event) => {
    this.setState({ value: event.target.value });
  };

  refInput = (input) => {
    this.input = input;
  };

  render() {
    const {
      children,
      icon,
      inputType,
      placeholder,
      submitLabel,
      title,

      bodyClassName,
      contentClassName,
      titleClassName,

      onSubmit,

      ...props
    } = this.props;
    const {
      busy,
      value,
    } = this.state;

    return (
      <Dialog
        variant="fullWidth"
        {...props}
        classes={{
          paper: cx('Dialog', contentClassName),
        }}
        onClose={this.handleClose}
        aria-labelledby={this.ariaTitle}
      >
        <DialogTitle className={cx('Dialog-title', titleClassName)} id={this.ariaTitle}>
          {title}
        </DialogTitle>
        <DialogContent className={cx('Dialog-body', bodyClassName)}>
          <Form onSubmit={this.handleSubmit}>
            {children}
            <FormGroup>
              <TextField
                ref={this.refInput}
                autoFocus
                type={inputType}
                placeholder={placeholder}
                icon={icon}
                value={value}
                onChange={this.handleInputChange}
                onKeyDown={(e) => e.stopPropagation()}
              />
            </FormGroup>
            <FormGroup>
              <Button disabled={busy}>
                {busy ? <div className="Button-loading"><CircularProgress size="100%" /></div> : submitLabel}
              </Button>
            </FormGroup>
          </Form>
        </DialogContent>
      </Dialog>
    );
  }
}
