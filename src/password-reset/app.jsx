import { createRoot } from 'react-dom';
import Translator from '@u-wave/translate';
import PasswordResetApp from './containers/PasswordResetApp';
import english from '../../locale/en.yaml';
import './app.css';

const qs = new URL(window.location.href).searchParams;
const resetKey = document.querySelector('#reset-data').textContent || qs.get('key');

const translator = new Translator(english.uwave);

const root = createRoot(document.querySelector('#app'));
root.render(<PasswordResetApp translator={translator} resetKey={resetKey} />);
