import React from 'react';
import PropTypes from 'prop-types';
import { useTranslator } from '@u-wave/react-translate';
import CircularProgress from '@material-ui/core/CircularProgress';
import EmailIcon from '@material-ui/icons/Email';
import Form from '../../Form';
import FormGroup from '../../Form/Group';
import TextField from '../../Form/TextField';
import Button from '../../Form/Button';

const {
  useCallback,
  useRef,
  useState,
} = React;

function ResetPasswordForm({
  error,
  onResetPassword,
  onCloseDialog,
}) {
  const { t } = useTranslator();
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const refEmail = useRef(null);

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    setBusy(false);
    Promise.resolve(onResetPassword({
      email: refEmail.value,
    })).then(() => {
      setDone(true);
    }).finally(() => {
      setBusy(false);
    });
  }, [onResetPassword]);

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
      {error && <FormGroup>{error.message}</FormGroup>}
      <FormGroup>
        <TextField
          ref={refEmail}
          className="ResetPasswordForm-field"
          type="email"
          autocomplete="email"
          placeholder={t('login.email')}
          icon={<EmailIcon nativeColor="#9f9d9e" />}
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
