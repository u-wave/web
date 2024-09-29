import { useCallback } from 'react';
import type { JsonObject } from 'type-fest';
import {
  register,
  login,
  finishSocialLogin,
  resetPassword,
  supportsSocialAuthSelector,
} from '../reducers/auth';
import { loginDialogSelector, openLoginDialog, closeLoginDialog } from '../reducers/dialogs';
import { reCaptchaSiteKeySelector } from '../reducers/config';
import LoginDialog from '../components/Dialogs/LoginDialog';
import { useDispatch, useSelector } from '../hooks/useRedux';

function LoginDialogContainer() {
  const state = useSelector(loginDialogSelector);
  const reCaptchaSiteKey = useSelector(reCaptchaSiteKeySelector);
  const supportsSocialAuth = useSelector(supportsSocialAuthSelector);
  const dispatch = useDispatch();
  const onOpenResetPasswordDialog = useCallback(() => {
    dispatch(openLoginDialog({ show: 'reset' }));
  }, [dispatch]);
  const onResetPassword = useCallback(async (param: { email: string }) => {
    await dispatch(resetPassword(param.email));
  }, [dispatch]);
  const onLogin = useCallback(async (param: { email: string, password: string }) => {
    const result = await dispatch(login(param));
    // This is just a super janky way to uphold a contract
    if (result.meta.requestStatus === 'rejected') {
      return { error: true };
    }
    return { error: false };
  }, [dispatch]);
  const onRegister = useCallback(async (param: {
    username: string,
    email: string,
    password: string,
    grecaptcha?: string | null | undefined,
  }) => {
    await dispatch(register(param));
  }, [dispatch]);
  const onSocialFinish = useCallback(async (param: { service: string, params: JsonObject }) => {
    await dispatch(finishSocialLogin(param));
  }, [dispatch]);
  const onCloseDialog = useCallback(() => dispatch(closeLoginDialog()), [dispatch]);

  return (
    <LoginDialog
      reCaptchaSiteKey={reCaptchaSiteKey ?? undefined}
      supportsSocialAuth={supportsSocialAuth}
      {...state}
      onOpenResetPasswordDialog={onOpenResetPasswordDialog}
      // @ts-expect-error TS2322: should refactor this to not use the state spreading
      // from the redux store
      onResetPassword={onResetPassword}
      onLogin={onLogin}
      onRegister={onRegister}
      onSocialFinish={onSocialFinish}
      onCloseDialog={onCloseDialog}
    />
  );
}

export default LoginDialogContainer;
