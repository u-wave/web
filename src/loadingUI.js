// We use `querySelectorAll` in this file because there are typically _two_
// loading indicators, even if only one is visible: one for the desktop loading
// screen and one for the mobile loading screen.

function setLoadingText(text) {
  Array.from(document.querySelectorAll('.LoadingIndicator-notice')).forEach((notice) => {
    // eslint-disable-next-line no-param-reassign
    notice.textContent = text;
  });
}

export default function load(uw) {
  setLoadingText('Loading üWave...');
  const longBuildTimer = setTimeout(() => {
    setLoadingText('Loading is taking a long time, stand by...');
  }, 5000);

  return uw.build().then(() => {
    clearTimeout(longBuildTimer);
    return uw.renderToDOM(document.querySelector('#app'));
  }).then(() => {
    Object.assign(document.querySelector('#app-loading'), {
      innerHTML: '',
      hidden: true,
    });
  }).catch((err) => {
    clearTimeout(longBuildTimer);

    setLoadingText(`Error: ${err.message}`);
    Array.from(document.querySelectorAll('.LoadingIndicator-loader')).forEach((el) => {
      // eslint-disable-next-line no-param-reassign
      el.hidden = true;
    });
    Array.from(document.querySelectorAll('.LoadingIndicator-warning')).forEach((el) => {
      // eslint-disable-next-line no-param-reassign
      el.hidden = false;
    });

    throw err;
  });
}
