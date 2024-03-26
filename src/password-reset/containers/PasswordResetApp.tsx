import { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// @ts-expect-error TS2305: no types
import { TranslateProvider } from '@u-wave/react-translate';
import ErrorArea from '../../containers/ErrorArea';
import PasswordResetPage from '../components/PasswordResetPage';
import PasswordResetSuccessPage from '../components/PasswordResetSuccessPage';
import theme from '../../theme';

const muiTheme = createTheme(theme);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Translator = any; // from @u-wave/translate
type PasswordResetAppProps = {
  translator: Translator,
  resetKey: string,
};
function PasswordResetApp({ translator, resetKey }: PasswordResetAppProps) {
  const [success, setSuccess] = useState(false);

  return (
    <ThemeProvider theme={muiTheme}>
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
    </ThemeProvider>
  );
}

export default PasswordResetApp;
