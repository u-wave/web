import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';

import Form from '../../Form';
import FormGroup from '../../Form/Group';
import TextField from '../../Form/TextField';
import Button from '../../Form/Button';
import Loader from '../../Loader';

export default class PromptDialog extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    placeholder: PropTypes.string,
    submitLabel: PropTypes.string,
    inputType: PropTypes.string,
    icon: PropTypes.node,
    value: PropTypes.string,

    bodyClassName: PropTypes.string,
    contentClassName: PropTypes.string,
    titleClassName: PropTypes.string,

    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
  };

  static defaultProps = {
    submitLabel: 'OK',
    inputType: 'text'
  };

  state = {
    busy: false,
    value: this.props.value || ''
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const promise = this.props.onSubmit(this.input.value);
    if (promise && promise.then) {
      this.setState({ busy: true });
      const onDone = () => {
        this.setState({ busy: false });
      };
      promise.then(onDone, onDone);
    }
  };

  handleClose = () => {
    this.props.onCancel();
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

      bodyClassName,
      contentClassName,
      titleClassName,

      ...props
    } = this.props;
    const {
      busy,
      value
    } = this.state;

    return (
      <Dialog
        {...props}
        contentClassName={cx('Dialog', contentClassName)}
        bodyClassName={cx('Dialog-body', bodyClassName)}
        titleClassName={cx('Dialog-title', titleClassName)}
        onRequestClose={this.handleClose}
        open
      >
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
            />
          </FormGroup>
          <FormGroup>
            <Button disabled={busy}>
              {busy ? <div className="Button-loading"><Loader size="tiny" /></div> : submitLabel}
            </Button>
          </FormGroup>
        </Form>
      </Dialog>
    );
  }
}
