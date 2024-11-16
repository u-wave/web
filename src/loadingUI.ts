// We use `querySelectorAll` in this file because there are typically _two_
// loading indicators, even if only one is visible: one for the desktop loading
// screen and one for the mobile loading screen.

import type Uwave from './Uwave';

function setLoadingText(text: string) {
  Array.from(document.querySelectorAll('.LoadingIndicator-notice')).forEach((notice) => {
    notice.textContent = text;
  });
}

export default async function load(uw: Uwave) {
  const appRoot = document.querySelector('#app')! as HTMLDivElement;
  const loadingRoot = document.querySelector('#app-loading')! as HTMLDivElement;

  setLoadingText('Loading üWave...');
  const longBuildTimer = setTimeout(() => {
    setLoadingText('Loading is taking a long time, stand by...');
  }, 5000);

  try {
    await uw.build();
    uw.renderToDOM(appRoot);

    document.querySelector('#critical')?.remove();
    loadingRoot.innerHTML = '';
    loadingRoot.hidden = true;
  } catch (err) {
    setLoadingText(`Error: ${err instanceof Error ? err.message : err}`);
    Array.from(document.querySelectorAll('.LoadingIndicator-loader')).forEach((el) => {
      (el as HTMLDivElement).hidden = true;
    });
    Array.from(document.querySelectorAll('.LoadingIndicator-warning')).forEach((el) => {
      (el as HTMLDivElement).hidden = false;
    });
    throw err;
  } finally {
    clearTimeout(longBuildTimer);
  }
}
