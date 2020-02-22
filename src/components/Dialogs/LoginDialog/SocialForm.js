import React from 'react';
import PropTypes from 'prop-types';
import { translate, Interpolate } from '@u-wave/react-translate';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress';
import UserIcon from '@material-ui/icons/Person';
import Form from '../../Form';
import FormGroup from '../../Form/Group';
import TextField from '../../Form/TextField';
import Button from '../../Form/Button';

const enhance = translate();

class SocialForm extends React.Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    error: PropTypes.object,
    service: PropTypes.string.isRequired,
    suggestedName: PropTypes.string,

    onSocialFinish: PropTypes.func.isRequired,
  };

  static defaultProps = {
    suggestedName: '',
  };

  constructor(props) {
    super(props);

    this.state = {
      busy: false,
      agreed: false,
    };
  }

  handleSubmit = (event) => {
    const { service, onSocialFinish } = this.props;
    event.preventDefault();
    this.setState({ busy: true });

    onSocialFinish(service, {
      username: this.username.value,
    }).finally(() => {
      this.setState({ busy: false });
    });
  };

  handleTosCheckbox = (event, checked) => {
    this.setState({
      agreed: checked,
    });
  };

  refUsername = (username) => {
    this.username = username;
  };

  render() {
    const {
      t,
      error,
      suggestedName,
    } = this.props;
    const { agreed, busy } = this.state;

    return (
      <Form className="RegisterForm" onSubmit={this.handleSubmit}>
        {error && <FormGroup>{error.message}</FormGroup>}
        <FormGroup>
          <TextField
            ref={this.refUsername}
            className="RegisterForm-field"
            autocomplete="nickname"
            defaultValue={suggestedName}
            placeholder={t('login.username')}
            icon={<UserIcon nativeColor="#9f9d9e" />}
            autoFocus
          />
        </FormGroup>

        <FormGroup>
          <FormControlLabel
            control={(
              <Checkbox
                checked={agreed}
                onChange={this.handleTosCheckbox}
              />
            )}
            label={(
              <Interpolate
                i18nKey="login.agree"
                privacyPolicy={(
                  <a target="_blank" rel="noreferrer noopener" href="/privacy.html">
                    {t('login.privacyPolicy')}
                  </a>
                )}
              />
            )}
          />
        </FormGroup>

        <FormGroup>
          <Button
            className="RegisterForm-submit"
            disabled={busy || !agreed}
          >
            {busy
              ? <div className="Button-loading"><CircularProgress size="100%" /></div>
              : t('login.register')}
          </Button>
        </FormGroup>
      </Form>
    );
  }
}

export default enhance(SocialForm);
