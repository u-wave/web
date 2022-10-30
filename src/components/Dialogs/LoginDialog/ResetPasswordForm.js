import React from 'react';
import PropTypes from 'prop-types';
import { useTranslator } from '@u-wave/react-translate';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import EmailIcon from '@mui/icons-material/Email';
import Form from '../../Form';
import FormGroup from '../../Form/Group';
import TextField from '../../Form/TextField';
import Button from '../../Form/Button';

const {
  useCallback,
  useState,
} = React;

function ResetPasswordForm({ error, onResetPassword, onCloseDialog }) {
  const { t } = useTranslator();
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    setBusy(true);
    Promise.resolve(onResetPassword({ email })).then(() => {
      setBusy(false);
      setDone(true);
    }, () => {
      setBusy(false);
    });
  }, [onResetPassword, email]);

  if (done) {
    return (
      <div>
        <p>{t('login.passwordResetSent')}</p>
        <p>
          <Button className="ResetPasswordForm-submit" onClick={onCloseDialog}>
            {t('close')}
          </Button>
        </p>
      </div>
    );
  }

  return (
    <Form className="ResetPasswordForm" onSubmit={handleSubmit}>
      {error && (
        <FormGroup>
          <Alert severity="error">{error.message}</Alert>
        </FormGroup>
      )}
      <FormGroup>
        <label className="FormGroup-label" htmlFor="reset-email">
          {t('login.email')}
        </label>
        <TextField
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          id="reset-email"
          className="ResetPasswordForm-field"
          type="email"
          autoComplete="email"
          icon={<EmailIcon htmlColor="#9f9d9e" />}
        />
      </FormGroup>

      <FormGroup>
        <Button
          className="ResetPasswordForm-submit"
          disabled={busy}
        >
          {busy ? (
            <div className="Button-loading"><CircularProgress size="100%" /></div>
          ) : t('login.requestPasswordReset')}
        </Button>
      </FormGroup>
    </Form>
  );
}

ResetPasswordForm.propTypes = {
  error: PropTypes.object,
  onResetPassword: PropTypes.func.isRequired,
  onCloseDialog: PropTypes.func.isRequired,
};

export default ResetPasswordForm;
