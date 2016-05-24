import cx from 'classnames';
import * as React from 'react';
import Dialog from 'material-ui/Dialog';

import Form from '../../Form';
import FormGroup from '../../Form/Group';
import TextField from '../../Form/TextField';
import Button from '../../Form/Button';
import Loader from '../../Loader';

export default class PromptDialog extends React.Component {
  static propTypes = {
    title: React.PropTypes.node.isRequired,
    children: React.PropTypes.node,
    placeholder: React.PropTypes.string,
    submitLabel: React.PropTypes.string,
    inputType: React.PropTypes.string,
    icon: React.PropTypes.node,
    value: React.PropTypes.string,

    bodyClassName: React.PropTypes.string,
    contentClassName: React.PropTypes.string,
    titleClassName: React.PropTypes.string,

    onSubmit: React.PropTypes.func.isRequired,
    onCancel: React.PropTypes.func.isRequired
  };

  static defaultProps = {
    submitLabel: 'OK',
    inputType: 'text'
  };

  state = {
    busy: false,
    value: this.props.value || ''
  };

  handleSubmit = event => {
    event.preventDefault();
    const promise = this.props.onSubmit(this.refs.input.value);
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

  handleInputChange = event => {
    this.setState({ value: event.target.value });
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
              ref="input"
              autofocus
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
