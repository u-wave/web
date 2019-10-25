function setLoadingText(text) {
  document.querySelector('.LoadingScreen-notice').textContent = text;
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
    document.querySelector('#app-loading').innerHTML = '';
    document.querySelector('#jss').textContent = '';
  }).catch((err) => {
    setLoadingText(`Error: ${err.message}`);
    document.querySelector('.LoadingScreen-loader').hidden = true;
    document.querySelector('.LoadingScreen-warning').hidden = false;

    throw err;
  });
}
