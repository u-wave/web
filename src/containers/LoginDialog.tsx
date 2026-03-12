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
  // TODO: This is setting up all state for all dialogs and then branching,
  // but the state is only used a few levels down. It would be nicer to set
  // up the state & actions where they're actually used.

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

  switch (state.show) {
    case 'login':
      return (
        <LoginDialog
          show="login"
          open={state.open}
          supportsSocialAuth={supportsSocialAuth}
          onCloseDialog={onCloseDialog}
          onLogin={onLogin}
          onOpenResetPasswordDialog={onOpenResetPasswordDialog}
        />
      );
    case 'register':
      return (
        <LoginDialog
          show="register"
          open={state.open}
          reCaptchaSiteKey={reCaptchaSiteKey ?? undefined}
          supportsSocialAuth={supportsSocialAuth}
          onCloseDialog={onCloseDialog}
          onRegister={onRegister}
        />
      );
    case 'reset':
      return (
        <LoginDialog
          show="reset"
          open={state.open}
          onCloseDialog={onCloseDialog}
          onResetPassword={onResetPassword}
        />
      );
    case 'social':
      return (
        <LoginDialog
          show="social"
          open={state.open}
          // These ! are a bit weird, but in src/reducers/dialogs.ts
          // `merge` returns a `Partial<T>`? not sure why that was.
          service={state.service!}
          avatars={state.avatars!}
          onCloseDialog={onCloseDialog}
          onSocialFinish={onSocialFinish}
        />
      );
    default:
      return null;
  }
}

export default LoginDialogContainer;
