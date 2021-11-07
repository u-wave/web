import React from 'react';
import PropTypes from 'prop-types';
import { useTranslator, Interpolate } from '@u-wave/react-translate';
import Alert from '@mui/material/Alert';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import CircularProgress from '@mui/material/CircularProgress';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import UserIcon from '@mui/icons-material/Person';
import upperCaseFirst from '../../../utils/upperCaseFirst';
import Form from '../../Form';
import FormGroup from '../../Form/Group';
import TextField from '../../Form/TextField';
import Button from '../../Form/Button';

const {
  useCallback,
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
  const [username, setUsername] = useState(suggestedName);

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    setBusy(true);

    onSocialFinish(service, { avatar, username }).finally(() => {
      setBusy(false);
    });
  }, [avatar, username, service, onSocialFinish]);

  const handleTosCheckbox = useCallback((event) => {
    setAgreed(event.target.checked);
  }, []);

  const handleChangeAvatar = useCallback((name) => {
    setAvatar(name);
  }, []);

  const handleChangeUsername = useCallback((event) => {
    setUsername(event.target.value);
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
          className="RegisterForm-field"
          autocomplete="nickname"
          placeholder={t('login.username')}
          icon={<UserIcon nativeColor="#9f9d9e" />}
          autoFocus
          value={username}
          onChange={handleChangeUsername}
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
