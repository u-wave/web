import { useCallback, useState } from 'react';
import { useTranslator, Interpolate } from '@u-wave/react-translate';
import { useAsyncCallback } from 'react-async-hook';
import Alert from '@mui/material/Alert';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import CircularProgress from '@mui/material/CircularProgress';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import { mdiAccount } from '@mdi/js';
import upperCaseFirst from '../../../utils/upperCaseFirst';
import Form from '../../Form';
import FormGroup from '../../Form/Group';
import TextField from '../../Form/TextField';
import Button from '../../Form/Button';
import SvgIcon from '../../SvgIcon';

type AvatarListProps = {
  avatars: Record<string, string>,
  selected: string,
  onChange: (avatar: string) => void,
};
function AvatarList({ avatars, selected, onChange }: AvatarListProps) {
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

export type SocialFormProps = {
  show: 'social', // eslint-disable-line react/no-unused-prop-types
  service: string,
  avatars: Record<string, string>,
  suggestedName?: string,
  onCloseDialog: () => void, // eslint-disable-line react/no-unused-prop-types
  onSocialFinish: (data: {
    service: string,
    params: { avatar: string, username: string }
  }) => Promise<void>,
};
function SocialForm({
  service,
  avatars,
  suggestedName = '',
  onSocialFinish,
}: SocialFormProps) {
  const { t } = useTranslator();
  const [agreed, setAgreed] = useState(false);
  const [avatar, setAvatar] = useState('sigil');
  const [username, setUsername] = useState(suggestedName);

  const handleSubmit = useAsyncCallback(async (event) => {
    event.preventDefault();
    await onSocialFinish({
      service,
      params: { avatar, username },
    });
  });

  const handleTosCheckbox = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setAgreed(event.target.checked);
  }, []);

  const handleChangeAvatar = useCallback((name: string) => {
    setAvatar(name);
  }, []);

  const handleChangeUsername = useCallback((event: React.FormEvent<HTMLInputElement>) => {
    setUsername(event.currentTarget.value);
  }, []);

  return (
    <Form className="RegisterForm" onSubmit={handleSubmit.execute}>
      {handleSubmit.error && (
        <FormGroup>
          <Alert severity="error">{handleSubmit.error.message}</Alert>
        </FormGroup>
      )}
      <FormGroup>
        <TextField
          className="RegisterForm-field"
          autoComplete="nickname"
          placeholder={t('login.username')}
          icon={<SvgIcon path={mdiAccount} />}
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
          disabled={handleSubmit.loading || !agreed}
        >
          {handleSubmit.loading
            ? <div className="Button-loading"><CircularProgress size="100%" /></div>
            : t('login.register')}
        </Button>
      </FormGroup>
    </Form>
  );
}

export default SocialForm;
