import { useState } from 'react';
import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// @ts-expect-error TS2305: no types
import { TranslateProvider } from '@u-wave/react-translate';
import ErrorArea from '../../containers/ErrorArea';
import PasswordResetPage from '../components/PasswordResetPage';
import PasswordResetSuccessPage from '../components/PasswordResetSuccessPage';
import theme from '../../theme';
import CrashHandler from '../../components/CrashHandler';
import errors from '../../reducers/errors';

const muiTheme = createTheme({ ...theme, cssVariables: true });

const store = configureStore({
  reducer: combineReducers({ errors }),
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Translator = any; // from @u-wave/translate
type PasswordResetAppProps = {
  translator: Translator,
  resetKey: string,
};
function PasswordResetApp({ translator, resetKey }: PasswordResetAppProps) {
  const [success, setSuccess] = useState(false);

  return (
    <Provider store={store}>
      <ThemeProvider theme={muiTheme}>
        <CrashHandler>
          <TranslateProvider translator={translator}>
            {success ? (
              <PasswordResetSuccessPage />
            ) : (
              <PasswordResetPage
                resetKey={resetKey}
                onSuccess={() => setSuccess(true)}
              />
            )}
            <ErrorArea />
          </TranslateProvider>
        </CrashHandler>
      </ThemeProvider>
    </Provider>
  );
}

export default PasswordResetApp;
