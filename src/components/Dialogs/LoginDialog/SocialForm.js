import React from 'react';
import PropTypes from 'prop-types';
import { translate, Interpolate } from '@u-wave/react-translate';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import UserIcon from '@material-ui/icons/Person';
import { upperCaseFirst } from 'upper-case-first';
import Form from '../../Form';
import FormGroup from '../../Form/Group';
import TextField from '../../Form/TextField';
import Button from '../../Form/Button';

const enhance = translate();

function AvatarList({ avatars, selected, onChange }) {
  const avatarNames = Object.keys(avatars);

  return (
    <RadioGroup
      value={selected}
      onChange={(event) => onChange(event.target.value)}
    >
      {avatarNames.map((name) => (
        <FormControlLabel
          key={name}
          control={<Radio />}
          label={(
            <>
              <div className="Avatar AvatarList--avatar">
                <img
                  className="Avatar-image"
                  src={avatars[name]}
                  alt={name}
                />
              </div>
              <span>{upperCaseFirst(name)}</span>
            </>
          )}
          value={name}
        />
      ))}
    </RadioGroup>
  );
}

AvatarList.propTypes = {
  avatars: PropTypes.objectOf(PropTypes.string).isRequired,
  selected: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

class SocialForm extends React.Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    error: PropTypes.object,
    service: PropTypes.string.isRequired,
    avatars: PropTypes.objectOf(PropTypes.string).isRequired,
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
      avatar: 'sigil',
    };
  }

  handleSubmit = (event) => {
    const { service, onSocialFinish } = this.props;
    const { avatar } = this.state;

    event.preventDefault();
    this.setState({ busy: true });

    onSocialFinish(service, {
      avatar,
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

  handleChangeAvatar = (name) => {
    this.setState({
      avatar: name,
    });
  };

  refUsername = (username) => {
    this.username = username;
  };

  render() {
    const {
      t,
      error,
      avatars,
      suggestedName,
    } = this.props;
    const { agreed, avatar, busy } = this.state;

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
          <FormControl component="fieldset">
            <FormLabel component="legend">Avatar</FormLabel>
            <AvatarList
              avatars={avatars}
              selected={avatar}
              onChange={this.handleChangeAvatar}
            />
          </FormControl>
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
