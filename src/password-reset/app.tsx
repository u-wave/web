import Translator from '@u-wave/translate';
import { createRoot } from 'react-dom/client';
import type { JsonObject } from 'type-fest';
import english from '../../locale/en.yaml';
import PasswordResetApp from './containers/PasswordResetApp';
import './app.css';

const qs = new URL(window.location.href).searchParams;
const resetKey = document.querySelector('#reset-data')!.textContent || qs.get('key');

const translator = new Translator((english as { uwave: JsonObject }).uwave);

const root = createRoot(document.querySelector('#app')!);
root.render(
  (
    <PasswordResetApp
      translator={translator}
      resetKey={resetKey!}
    />
  ),
);
