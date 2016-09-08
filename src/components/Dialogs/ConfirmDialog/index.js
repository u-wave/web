import * as React from 'react';
import Dialog from 'material-ui/Dialog';

import Form from '../../Form';
import FormGroup from '../../Form/Group';
import Button from '../../Form/Button';
import Loader from '../../Loader';

export default class ConfirmDialog extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
    confirmLabel: React.PropTypes.string,
    cancelLabel: React.PropTypes.string,

    onConfirm: React.PropTypes.func.isRequired,
    onCancel: React.PropTypes.func.isRequired
  };

  static defaultProps = {
    cancelLabel: 'Cancel',
    confirmLabel: 'OK'
  };

  state = {
    busy: false
  };

  handleSubmit = event => {
    event.preventDefault();
  };

  handleConfirm = event => {
    event.preventDefault();
    const promise = this.props.onConfirm();
    if (promise && promise.then) {
      this.setState({ busy: true });
      const onDone = () => {
        this.setState({ busy: false });
      };
      promise.then(onDone, onDone);
    }
  };

  handleClose = event => {
    if (event && event.preventDefault) {
      event.preventDefault();
    }
    this.props.onCancel();
  };

  render() {
    const {
      children,
      cancelLabel,
      confirmLabel,
      ...props
    } = this.props;
    const { busy } = this.state;

    return (
      <Dialog
        {...props}
        onRequestClose={this.handleClose}
        open
      >
        <Form onSubmit={this.handleSubmit}>
          {children}
          <FormGroup className="ConfirmDialog-buttons">
            <div className="ConfirmDialog-button">
              <Button disabled={busy} onClick={this.handleClose}>
                {cancelLabel}
              </Button>
            </div>
            <div className="ConfirmDialog-spacer" />
            <div className="ConfirmDialog-button">
              <Button disabled={busy} onClick={this.handleConfirm}>
                {busy ? <div className="Button-loading"><Loader size="tiny" /></div> : confirmLabel}
              </Button>
            </div>
          </FormGroup>
        </Form>
      </Dialog>
    );
  }
}
