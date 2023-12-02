// We use `querySelectorAll` in this file because there are typically _two_
// loading indicators, even if only one is visible: one for the desktop loading
// screen and one for the mobile loading screen.

function setLoadingText(text) {
  Array.from(document.querySelectorAll('.LoadingIndicator-notice')).forEach((notice) => {
    // eslint-disable-next-line no-param-reassign
    notice.textContent = text;
  });
}

export default async function load(uw) {
  setLoadingText('Loading üWave...');
  const longBuildTimer = setTimeout(() => {
    setLoadingText('Loading is taking a long time, stand by...');
  }, 5000);

  try {
    await uw.build();

    uw.renderToDOM(document.querySelector('#app'));

    document.querySelector('#critical')?.remove();
    Object.assign(document.querySelector('#app-loading'), {
      innerHTML: '',
      hidden: true,
    });
  } catch (err) {
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
  } finally {
    clearTimeout(longBuildTimer);
  }
}
