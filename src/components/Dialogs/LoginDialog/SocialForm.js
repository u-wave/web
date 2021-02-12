import React from 'react';
import PropTypes from 'prop-types';
import { useTranslator, Interpolate } from '@u-wave/react-translate';
import Alert from '@material-ui/core/Alert';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import UserIcon from '@material-ui/icons/Person';
import upperCaseFirst from '../../../utils/upperCaseFirst';
import Form from '../../Form';
import FormGroup from '../../Form/Group';
import TextField from '../../Form/TextField';
import Button from '../../Form/Button';

const {
  useCallback,
  useRef,
  useState,
} = React;

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

function SocialForm({
  error,
  service,
  avatars,
  suggestedName = '',
  onSocialFinish,
}) {
  const { t } = useTranslator();
  const [isBusy, setBusy] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [avatar, setAvatar] = useState('sigil');
  const refUsername = useRef(null);

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    setBusy(true);

    onSocialFinish(service, {
      avatar,
      username: refUsername.current.value,
    }).finally(() => {
      setBusy(false);
    });
  }, [avatar, service, onSocialFinish]);

  const handleTosCheckbox = useCallback((event, checked) => {
    setAgreed(checked);
  }, []);

  const handleChangeAvatar = useCallback((name) => {
    setAvatar(name);
  }, []);

  return (
    <Form className="RegisterForm" onSubmit={handleSubmit}>
      {error && (
        <FormGroup>
          <Alert severity="error">{error.message}</Alert>
        </FormGroup>
      )}
      <FormGroup>
        <TextField
          ref={refUsername}
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
            onChange={handleChangeAvatar}
          />
        </FormControl>
      </FormGroup>

      <FormGroup>
        <FormControlLabel
          control={(
            <Checkbox
              checked={agreed}
              onChange={handleTosCheckbox}
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
          disabled={isBusy || !agreed}
        >
          {isBusy
            ? <div className="Button-loading"><CircularProgress size="100%" /></div>
            : t('login.register')}
        </Button>
      </FormGroup>
    </Form>
  );
}

SocialForm.propTypes = {
  error: PropTypes.object,
  service: PropTypes.string.isRequired,
  avatars: PropTypes.objectOf(PropTypes.string).isRequired,
  suggestedName: PropTypes.string,
  onSocialFinish: PropTypes.func.isRequired,
};

export default SocialForm;
