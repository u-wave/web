/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { translate } from 'react-i18next';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import uniqueId from 'lodash/uniqueId';
import Form from '../Form';
import FormGroup from '../Form/Group';
import Button from '../Form/Button';
import { getAvailableAvatars } from '../../actions/UserActionCreators';
import AvatarPreview from './AvatarPreview';

const mapDispatchToProps = {
  loadAvailableAvatars: getAvailableAvatars,
};

const enhance = compose(
  connect(null, mapDispatchToProps),
  translate(),
);

class AvatarDialog extends React.Component {
  title = uniqueId('avatar');

  static propTypes = {
    availableAvatars: PropTypes.arrayOf(PropTypes.shape({
      type: PropTypes.string.isRequired,
      name: PropTypes.string,
      service: PropTypes.string,
      url: PropTypes.string.isRequired,
    })).isRequired,
    user: PropTypes.object.isRequired,
    loadAvailableAvatars: PropTypes.func.isRequired,
    open: PropTypes.bool,
    onChangeAvatar: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
  };

  static defaultProps = {
    open: false,
  };

  state = {
    loading: true,
    busy: false,
    selected: null,
  };

  componentDidMount() {
    const { user, loadAvailableAvatars } = this.props;

    loadAvailableAvatars(user._id).then(({ data: availableAvatars }) => {
      this.setState({
        availableAvatars,
        loading: false,
      });
    });
  }

  handleSubmit = (event) => {
    const { user, onChangeAvatar } = this.props;

    event.preventDefault();

    this.setState({ busy: true });

    Promise.resolve(onChangeAvatar(user, null)).finally(() => {
      this.setState({ busy: false });
    });
  };

  handleSelect = (avatar) => {
    this.setState({ selected: avatar.url });
  };

  render() {
    const { t, open } = this.props;
    const { busy, loading, selected, availableAvatars } = this.state;

    return (
      <Dialog
        open={open}
        classes={{ paper: 'Dialog AvatarDialog' }}
        aria-labelledby={this.title}
      >
        <DialogTitle className="Dialog-title" id={this.title}>
          {t('settings.profile.avatar.change')}
        </DialogTitle>
        <DialogContent className="Dialog-body">
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <p className="AvatarDialog-helpText">
                {t('settings.profile.avatar.help')}
              </p>
            </FormGroup>

            <FormGroup>
              {loading ? (
                <CircularProgress size={240} />
              ) : (
                availableAvatars.map(props => (
                  <AvatarPreview
                    {...props}
                    selected={selected === props.url}
                    onSelect={this.handleSelect.bind(null, props)}
                  />
                ))
              )}
            </FormGroup>

            <FormGroup>
              <Button disabled={busy}>
                {busy ? (
                  <div className="Button-loading">
                    <CircularProgress size="100%" />
                  </div>
                ) : t('settings.profile.avatar.save')}
              </Button>
            </FormGroup>
          </Form>
        </DialogContent>
      </Dialog>
    );
  }
}

export default enhance(AvatarDialog);
