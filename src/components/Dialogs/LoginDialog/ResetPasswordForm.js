import React from 'react';
import PropTypes from 'prop-types';
import { useTranslator } from '@u-wave/react-translate';
import { useAsyncCallback } from 'react-async-hook';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import EmailIcon from '@mui/icons-material/Email';
import Form from '../../Form';
import FormGroup from '../../Form/Group';
import TextField from '../../Form/TextField';
import Button from '../../Form/Button';

const {
  useState,
} = React;

function ResetPasswordForm({ onResetPassword, onCloseDialog }) {
  const { t } = useTranslator();
  const [email, setEmail] = useState('');

  const handleSubmit = useAsyncCallback(async (event) => {
    event.preventDefault();
    await onResetPassword({ email });
  }, [onResetPassword, email]);

  if (handleSubmit.status === 'success') {
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
    <Form className="ResetPasswordForm" onSubmit={handleSubmit.execute}>
      {handleSubmit.error && (
        <FormGroup>
          <Alert severity="error">{handleSubmit.error.message}</Alert>
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
          disabled={handleSubmit.loading}
        >
          {handleSubmit.loading ? (
            <div className="Button-loading"><CircularProgress size="100%" /></div>
          ) : t('login.requestPasswordReset')}
        </Button>
      </FormGroup>
    </Form>
  );
}

ResetPasswordForm.propTypes = {
  onResetPassword: PropTypes.func.isRequired,
  onCloseDialog: PropTypes.func.isRequired,
};

export default ResetPasswordForm;
